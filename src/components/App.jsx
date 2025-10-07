import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import List from "./List";
import MermaidItem from "./MermaidItem";
import Editor from "./Editor";
import Tutorial from "./Tutorial";

import ScrollToTopButton from "./ScrollButtonToTop";
import "../styles/App.css";

// Composant pour gérer le scroll to top sur les changements de route
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/mermaid-studio" element={<HomePage />} />
            <Route path="/mermaid-studio/list" element={<List />} />
            <Route path="/mermaid-studio/list/:id" element={<MermaidItem />} />
            <Route path="/mermaid-studio/editor" element={<Editor />} />
            <Route path="/mermaid-studio/tutorial" element={<Tutorial />} />
          </Routes>
          <ScrollToTopButton />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
