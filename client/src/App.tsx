import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Articles from './pages/Articles';
import ArticlesPlan from './pages/ArticlesPlan'; // Assuming ArticlesPlan is another component you have

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article-plans" element={<ArticlesPlan />} /> {/* Added closing angle bracket */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
