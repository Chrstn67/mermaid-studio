"use client";

import { Link, useLocation } from "react-router-dom";

import "../styles/Header.css";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/mermaid-studio" className="logo">
          <span className="logo-icon">📊</span>
          <h1>Mermaid Studio</h1>
        </Link>
        <nav>
          <Link
            to="/mermaid-studio"
            className={isActive("/mermaid-studio") ? "active" : ""}
          >
            Accueil
          </Link>
          <Link
            to="/mermaid-studio/list"
            className={isActive("/list") ? "active" : ""}
          >
            Galerie
          </Link>

          <Link
            to="/mermaid-studio/tutorial"
            className={isActive("/tutorial") ? "active" : ""}
          >
            Tutoriels
          </Link>
          <Link
            to="/mermaid-studio/editor"
            className={isActive("/editor") ? "active" : ""}
          >
            Éditeur
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
