import { HashRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import List from "./List";
import MermaidItem from "./MermaidItem";
import MermaidEditor from "./MermaidEditor";
import Tutorial from "./Tutorial";
import ScrollToTopButton from "./ScrollToTopButton";
import "../styles/App.css";

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
    <div className="App">
      <HashRouter>
        <div className="app">
          <ScrollToTop />
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/list" element={<List />} />
              <Route path="/list/:id" element={<MermaidItem />} />
              <Route path="/editor" element={<MermaidEditor />} />
              <Route path="/tutorial" element={<Tutorial />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
      <ScrollToTopButton />
    </div>
  );
}

export default App;
