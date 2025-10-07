"use client";

import { useState } from "react";
import "../styles/Footer.css";

const Footer = () => {
  const [showLegal, setShowLegal] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a
              href="https://mermaid.js.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation Mermaid
            </a>
            <button className="legal-link" onClick={() => setShowLegal(true)}>
              Mentions Légales
            </button>
          </div>
          <p>&copy; {new Date().getFullYear()} Mermaid Studio </p>
          <img src="Logo.jpg" alt="Logo Developpeur" className="logo-image" />
        </div>
      </footer>

      {/* Modale Mentions Légales */}
      {showLegal && (
        <div className="modal-overlay" onClick={() => setShowLegal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Mentions Légales</h2>
              <button
                className="modal-close"
                onClick={() => setShowLegal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <h3>Éditeur du site</h3>
              <p>Mermaid Studio</p>

              <h3>Hébergement</h3>
              <p>
                Ce site, créé par Christian HUMBERT
                (chrstn.hmbrt67@outlook.com), est hébergé par GitHub.
              </p>

              <h3>Propriété intellectuelle</h3>
              <p>
                L'ensemble de ce site relève de la législation française et
                internationale sur le droit d'auteur et la propriété
                intellectuelle. Tous les droits de reproduction sont réservés, y
                compris pour les documents téléchargeables et les
                représentations iconographiques et photographiques.
              </p>

              <h3>Données personnelles</h3>
              <p>
                Aucune information personnelle n'est collectée à votre insu. Les
                informations que vous pouvez nous communiquer en utilisant les
                formulaires de contact sont uniquement utilisées pour répondre à
                vos demandes.
              </p>

              <h3>Technologies utilisées</h3>
              <p>
                Ce site utilise Mermaid.js pour la génération de diagrammes,
                React pour l'interface utilisateur.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn-primary"
                onClick={() => setShowLegal(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
