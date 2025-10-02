"use client";

import { Link, useLocation } from "react-router-dom";

import "../styles/Header.css";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/mermaid" className="logo">
          <span className="logo-icon">📊</span>
          <h1>Mermaid Studio</h1>
        </Link>
        <nav>
          <Link to="/mermaid" className={isActive("/mermaid") ? "active" : ""}>
            Accueil
          </Link>
          <Link
            to="/mermaid/list"
            className={isActive("/list") ? "active" : ""}
          >
            Galerie
          </Link>
          <Link
            to="/mermaid/editor"
            className={isActive("/editor") ? "active" : ""}
          >
            Éditeur
          </Link>
          <Link
            to="/mermaid/tutorial"
            className={isActive("/tutorial") ? "active" : ""}
          >
            Tutoriels
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
