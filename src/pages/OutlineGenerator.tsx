import React, { useState } from 'react';

const OutlineGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [outline, setOutline] = useState('');

  const generateOutline = async () => {
    // TODO: Implement OpenAI API call to generate outline
    const generatedOutline = 'Generated outline will appear here.';
    setOutline(generatedOutline);
    localStorage.setItem('generatedOutline', generatedOutline);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Outline Generator</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter your topic"
        className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 rounded"
      />
      <button
        onClick={generateOutline}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate Outline
      </button>
      {outline && (
        <div className="mt-4 p-4 bg-gray-800 rounded">
          <h2 className="text-xl font-bold mb-2">Generated Outline:</h2>
          <pre className="whitespace-pre-wrap">{outline}</pre>
        </div>
      )}
    </div>
  );
};

export default OutlineGenerator;