"use client";

import { Link } from "react-router-dom";
import { useEffect } from "react";

import "../styles/HomePage.css";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Crée tes diagrammes en toute simplicité</h1>
          <p className="subtitle">
            Visualise, édite et partage tes diagrammes Mermaid avec un éditeur
            WYSIWYG moderne et intuitif
          </p>
          <div className="cta-buttons">
            <Link to="/mermaid-studio/editor" className="btn btn-primary">
              <span>🚀</span> Commencer à créer
            </Link>
            <Link to="/mermaid-studio/tutorial" className="btn btn-secondary">
              <span>📚</span> Apprendre
            </Link>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <span className="feature-icon">✨</span>
          <h3>Éditeur WYSIWYG</h3>
          <p>
            Écris ton code Mermaid et visualise le résultat en temps réel.
            Aucune compilation nécessaire !
          </p>
        </div>
        <div className="feature">
          <span className="feature-icon">🎨</span>
          <h3>Diagrammes variés</h3>
          <p>
            Flowcharts, séquences, Git graphs, diagrammes ER, états et bien plus
            encore.
          </p>
        </div>
        <div className="feature">
          <span className="feature-icon">📚</span>
          <h3>Tutoriels intégrés</h3>
          <p>
            Apprends à créer chaque type de diagramme avec des exemples concrets
            et de la documentation.
          </p>
        </div>
        <div className="feature">
          <span className="feature-icon">💾</span>
          <h3>Galerie d{"'"}exemples</h3>
          <p>
            Explore une collection de diagrammes prêts à l{"'"}emploi pour t
            {"'"}inspirer.
          </p>
        </div>
        <div className="feature">
          <span className="feature-icon">🔍</span>
          <h3>Zoom & Navigation</h3>
          <p>
            Contrôle avancé avec zoom, panoramique et mode plein écran pour tes
            diagrammes.
          </p>
        </div>
        <div className="feature">
          <span className="feature-icon">📱</span>
          <h3>100% Responsive</h3>
          <p>
            Fonctionne parfaitement sur tous les appareils, du mobile au
            desktop.
          </p>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-container">
          <div className="stat">
            <div className="stat-number">15+</div>
            <div className="stat-label">Types de diagrammes</div>
          </div>
          <div className="stat">
            <div className="stat-number">∞</div>
            <div className="stat-label">Possibilités créatives</div>
          </div>
          <div className="stat">
            <div className="stat-number">100%</div>
            <div className="stat-label">Gratuit & Open Source</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
