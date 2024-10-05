import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import OutlineGenerator from './pages/OutlineGenerator';
import ArticleGenerator from './pages/ArticleGenerator';
import ArticleTranslator from './pages/ArticleTranslator';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<OutlineGenerator />} />
          <Route path="/article-generator" element={<ArticleGenerator />} />
          <Route path="/article-translator" element={<ArticleTranslator />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;