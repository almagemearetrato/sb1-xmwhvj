import React, { useState, useEffect } from 'react';
import { Clipboard, Download } from 'lucide-react';

const languages = [
  { code: 'de', name: 'Alemão' },
  { code: 'it', name: 'Italiano' },
  { code: 'es', name: 'Espanhol' },
  { code: 'fr', name: 'Francês' },
  { code: 'ar', name: 'Árabe' },
  { code: 'ko', name: 'Coreano' },
  { code: 'ja', name: 'Japonês' },
  { code: 'ru', name: 'Russo' },
  { code: 'en', name: 'Inglês' },
  { code: 'pt-br', name: 'Português (Brasil)' },
  { code: 'pt-pt', name: 'Português (Portugal)' },
  { code: 'zh', name: 'Chinês' },
  { code: 'hi', name: 'Hindi' }
];

const ArticleTranslator: React.FC = () => {
  const [article, setArticle] = useState('');
  const [targetLanguages, setTargetLanguages] = useState<string[]>([]);
  const [translatedArticles, setTranslatedArticles] = useState<{ [key: string]: string }>({});
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const savedSettings = localStorage.getItem('aiContentGeneratorSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    const transferredArticle = localStorage.getItem('articleToTranslate');
    if (transferredArticle) {
      setArticle(transferredArticle);
      localStorage.removeItem('articleToTranslate');
    }
  }, []);

  const translateArticle = async () => {
    if (!settings || !settings.apiKey) {
      alert('Please set your OpenAI API key in the Settings page.');
      return;
    }

    // TODO: Implement OpenAI API call to translate article
    const translatedResults: { [key: string]: string } = {};
    for (const lang of targetLanguages) {
      translatedResults[lang] = `Translated article in ${lang} will appear here.`;
    }
    setTranslatedArticles(translatedResults);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      alert('Article copied to clipboard!');
    });
  };

  const downloadArticle = (content: string, lang: string) => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translated-article-${lang}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLanguageChange = (langCode: string) => {
    setTargetLanguages(prev => 
      prev.includes(langCode) 
        ? prev.filter(code => code !== langCode)
        : [...prev, langCode]
    );
  };

  const handleSelectAll = () => {
    if (targetLanguages.length === languages.length) {
      setTargetLanguages([]);
    } else {
      setTargetLanguages(languages.map(lang => lang.code));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Article Translator</h1>
      <textarea
        value={article}
        onChange={(e) => setArticle(e.target.value)}
        placeholder="Enter your article or use the transferred article"
        className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 rounded h-40"
      />
      <div className="mb-4">
        <label className="block mb-2">Select target languages:</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={targetLanguages.length === languages.length}
              onChange={handleSelectAll}
              className="mr-2"
            />
            Select All
          </label>
          {languages.map((lang) => (
            <label key={lang.code} className="inline-flex items-center">
              <input
                type="checkbox"
                value={lang.code}
                checked={targetLanguages.includes(lang.code)}
                onChange={() => handleLanguageChange(lang.code)}
                className="mr-2"
              />
              {lang.name}
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={translateArticle}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Translate Article
      </button>
      {Object.entries(translatedArticles).map(([langCode, content]) => {
        const langName = languages.find(lang => lang.code === langCode)?.name || langCode;
        return (
          <div key={langCode} className="mt-4 p-4 bg-gray-800 rounded">
            <h2 className="text-xl font-bold mb-2">Translated Article ({langName}):</h2>
            <pre className="whitespace-pre-wrap overflow-x-auto">{content}</pre>
            <div className="mt-2">
              <button
                onClick={() => copyToClipboard(content)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                <Clipboard className="inline-block mr-1" size={16} /> Copy
              </button>
              <button
                onClick={() => downloadArticle(content, langCode)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded"
              >
                <Download className="inline-block mr-1" size={16} /> Download
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleTranslator;