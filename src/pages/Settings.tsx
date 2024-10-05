import React, { useState, useEffect } from 'react';

const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [language, setLanguage] = useState('en');
  const [tone, setTone] = useState('formal');
  const [wordCount, setWordCount] = useState(500);
  const [h1TitlePrompt, setH1TitlePrompt] = useState('');
  const [h2Count, setH2Count] = useState(3);
  const [h3Count, setH3Count] = useState(2);
  const [includeFAQ, setIncludeFAQ] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [metaDescriptionPrompt, setMetaDescriptionPrompt] = useState('');
  const [slugPrompt, setSlugPrompt] = useState('');
  const [focusKeywordPrompt, setFocusKeywordPrompt] = useState('');
  const [internalLinkCount, setInternalLinkCount] = useState(2);
  const [externalLinkCount, setExternalLinkCount] = useState(1);
  const [imageAltTextPrompt, setImageAltTextPrompt] = useState('');

  useEffect(() => {
    const savedSettings = localStorage.getItem('aiContentGeneratorSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setApiKey(parsedSettings.apiKey || '');
      setLanguage(parsedSettings.language || 'en');
      setTone(parsedSettings.tone || 'formal');
      setWordCount(parsedSettings.wordCount || 500);
      setH1TitlePrompt(parsedSettings.h1TitlePrompt || '');
      setH2Count(parsedSettings.h2Count || 3);
      setH3Count(parsedSettings.h3Count || 2);
      setIncludeFAQ(parsedSettings.includeFAQ || false);
      setCustomPrompt(parsedSettings.customPrompt || '');
      setMetaDescriptionPrompt(parsedSettings.metaDescriptionPrompt || '');
      setSlugPrompt(parsedSettings.slugPrompt || '');
      setFocusKeywordPrompt(parsedSettings.focusKeywordPrompt || '');
      setInternalLinkCount(parsedSettings.internalLinkCount || 2);
      setExternalLinkCount(parsedSettings.externalLinkCount || 1);
      setImageAltTextPrompt(parsedSettings.imageAltTextPrompt || '');
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      apiKey,
      language,
      tone,
      wordCount,
      h1TitlePrompt,
      h2Count,
      h3Count,
      includeFAQ,
      customPrompt,
      metaDescriptionPrompt,
      slugPrompt,
      focusKeywordPrompt,
      internalLinkCount,
      externalLinkCount,
      imageAltTextPrompt,
    };
    localStorage.setItem('aiContentGeneratorSettings', JSON.stringify(settings));
    alert('Settings saved!');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <form onSubmit={(e) => { e.preventDefault(); saveSettings(); }} className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">API Configuration</h2>
          <label htmlFor="apiKey" className="block mb-1">OpenAI API Key</label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Content Settings</h2>
          <div>
            <label htmlFor="language" className="block mb-1">Default Language</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="pt-br">Portuguese (Brazil)</option>
              <option value="pt-pt">Portuguese (Portugal)</option>
            </select>
          </div>
          <div className="mt-2">
            <label htmlFor="tone" className="block mb-1">Tone</label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            >
              <option value="formal">Formal</option>
              <option value="informal">Informal</option>
              <option value="conversational">Conversational</option>
              <option value="professional">Professional</option>
            </select>
          </div>
          <div className="mt-2">
            <label htmlFor="wordCount" className="block mb-1">Word Count</label>
            <input
              type="number"
              id="wordCount"
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Article Structure</h2>
          <div>
            <label htmlFor="h2Count" className="block mb-1">Number of H2 Titles</label>
            <input
              type="number"
              id="h2Count"
              value={h2Count}
              onChange={(e) => setH2Count(Number(e.target.value))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="h3Count" className="block mb-1">Number of H3 Titles per H2</label>
            <input
              type="number"
              id="h3Count"
              value={h3Count}
              onChange={(e) => setH3Count(Number(e.target.value))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>
          <div className="mt-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeFAQ}
                onChange={(e) => setIncludeFAQ(e.target.checked)}
                className="mr-2"
              />
              Include FAQ Section
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">SEO Settings</h2>
          <div>
            <label htmlFor="h1TitlePrompt" className="block mb-1">H1 Title Prompt</label>
            <textarea
              id="h1TitlePrompt"
              value={h1TitlePrompt}
              onChange={(e) => setH1TitlePrompt(e.target.value)}
              placeholder="Enter your prompt for generating H1 titles"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded h-24"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="metaDescriptionPrompt" className="block mb-1">Meta Description Prompt</label>
            <textarea
              id="metaDescriptionPrompt"
              value={metaDescriptionPrompt}
              onChange={(e) => setMetaDescriptionPrompt(e.target.value)}
              placeholder="Enter your prompt for generating meta descriptions"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded h-24"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="slugPrompt" className="block mb-1">Slug Prompt</label>
            <textarea
              id="slugPrompt"
              value={slugPrompt}
              onChange={(e) => setSlugPrompt(e.target.value)}
              placeholder="Enter your prompt for generating slugs"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded h-24"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="focusKeywordPrompt" className="block mb-1">Focus Keyword Prompt</label>
            <textarea
              id="focusKeywordPrompt"
              value={focusKeywordPrompt}
              onChange={(e) => setFocusKeywordPrompt(e.target.value)}
              placeholder="Enter your prompt for generating focus keywords"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded h-24"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="internalLinkCount" className="block mb-1">Number of Internal Links</label>
            <input
              type="number"
              id="internalLinkCount"
              value={internalLinkCount}
              onChange={(e) => setInternalLinkCount(Number(e.target.value))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="externalLinkCount" className="block mb-1">Number of External Links</label>
            <input
              type="number"
              id="externalLinkCount"
              value={externalLinkCount}
              onChange={(e) => setExternalLinkCount(Number(e.target.value))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="imageAltTextPrompt" className="block mb-1">Image Alt Text Prompt</label>
            <textarea
              id="imageAltTextPrompt"
              value={imageAltTextPrompt}
              onChange={(e) => setImageAltTextPrompt(e.target.value)}
              placeholder="Enter your prompt for generating image alt text"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded h-24"
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Custom Prompt</h2>
          <div>
            <label htmlFor="customPrompt" className="block mb-1">Custom Prompt for Article Generation</label>
            <textarea
              id="customPrompt"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your custom prompt for the OpenAI API"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded h-32"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;