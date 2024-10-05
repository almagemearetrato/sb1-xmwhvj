import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clipboard, Download, Globe } from 'lucide-react';

const ArticleGenerator: React.FC = () => {
  const [outline, setOutline] = useState('');
  const [article, setArticle] = useState('');
  const [settings, setSettings] = useState<any>(null);
  const [useGeneratedOutline, setUseGeneratedOutline] = useState(false);
  const [generatedOutline, setGeneratedOutline] = useState('');
  const [error, setError] = useState('');
  const [keywords, setKeywords] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedSettings = localStorage.getItem('aiContentGeneratorSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    const savedOutline = localStorage.getItem('generatedOutline');
    if (savedOutline) {
      setGeneratedOutline(savedOutline);
    }
  }, []);

  const generateArticle = async () => {
    setError('');
    if (!settings || !settings.apiKey) {
      setError('Please set your OpenAI API key in the Settings page.');
      return;
    }

    if (useGeneratedOutline && !generatedOutline) {
      setError('No generated outline found. Please generate an outline first or uncheck the "Use Generated Outline" option.');
      return;
    }

    const outlineToUse = useGeneratedOutline ? generatedOutline : outline;

    // TODO: Implement OpenAI API call to generate article
    const prompt = `${settings.customPrompt}\n\nOutline:\n${outlineToUse}\n\nGenerate an article in Markdown/MDX format based on this outline with the following parameters:\nTone: ${settings.tone}\nWord Count: ${settings.wordCount}\nInclude FAQ: ${settings.includeFAQ ? 'Yes' : 'No'}\n\nKeywords for internal links (insert these naturally throughout the article):\n${keywords}`;

    // Make API call here using the constructed prompt
    // For now, we'll use a placeholder Markdown content
    const generatedArticle = `
# Generated Article Title

## Introduction

This is a placeholder introduction for the generated article.

## Main Section 1

### Subsection 1.1

Content for subsection 1.1 goes here. [Keyword 1](#) is inserted here as an example of an internal link.

### Subsection 1.2

Content for subsection 1.2 goes here. We can also mention [Keyword 2](#) as another internal link example.

## Main Section 2

Content for main section 2 goes here. [Keyword 3](#) is our final example of an internal link.

## Conclusion

This is a placeholder conclusion for the generated article.

${settings.includeFAQ ? `
## FAQ

1. **Question 1?**
   Answer 1 goes here.

2. **Question 2?**
   Answer 2 goes here.
` : ''}
`;

    setArticle(generatedArticle);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(article).then(() => {
      alert('Article copied to clipboard!');
    });
  };

  const downloadArticle = () => {
    const blob = new Blob([article], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-article.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const transferToTranslate = () => {
    localStorage.setItem('articleToTranslate', article);
    navigate('/article-translator');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Article Generator</h1>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={useGeneratedOutline}
            onChange={(e) => setUseGeneratedOutline(e.target.checked)}
            className="mr-2"
          />
          Use Generated Outline
        </label>
      </div>
      {!useGeneratedOutline && (
        <textarea
          value={outline}
          onChange={(e) => setOutline(e.target.value)}
          placeholder="Enter your outline"
          className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 rounded h-40"
        />
      )}
      {useGeneratedOutline && (
        <div className="mb-4 p-4 bg-gray-800 border border-gray-700 rounded">
          <h2 className="text-xl font-bold mb-2">Generated Outline:</h2>
          <pre className="whitespace-pre-wrap">{generatedOutline || 'No outline generated yet.'}</pre>
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="keywords" className="block mb-2">Keywords for Internal Links (one per line):</label>
        <textarea
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Enter keywords for internal links, one per line"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded h-32"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={generateArticle}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Generate Article
      </button>
      {article && (
        <>
          <button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            <Clipboard className="inline-block mr-1" size={18} /> Copy to Clipboard
          </button>
          <button
            onClick={downloadArticle}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            <Download className="inline-block mr-1" size={18} /> Download Article
          </button>
          <button
            onClick={transferToTranslate}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            <Globe className="inline-block mr-1" size={18} /> Transfer to Translate
          </button>
          <div className="mt-4 p-4 bg-gray-800 rounded">
            <h2 className="text-xl font-bold mb-2">Generated Article (Markdown/MDX):</h2>
            <pre className="whitespace-pre-wrap overflow-x-auto">{article}</pre>
          </div>
        </>
      )}
    </div>
  );
};

export default ArticleGenerator;