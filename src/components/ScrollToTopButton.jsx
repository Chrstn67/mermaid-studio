import React, { useState, useEffect } from "react";
import "../styles/ScrollToTopButton.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Afficher le bouton quand l'utilisateur descend de 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Fonction pour remonter en haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`scroll-to-top ${isVisible ? "visible" : ""}`}>
      <button
        className="scroll-button"
        onClick={scrollToTop}
        aria-label="Retour en haut de la page"
      >
        <span className="arrow"></span>
        <span className="sparkle">✨</span>
      </button>

      {/* Effets de fond */}
      <div className="background-effects">
        <div className="pulse-ring"></div>
        <div className="pulse-ring delay-1"></div>
        <div className="pulse-ring delay-2"></div>
      </div>
    </div>
  );
};

export default ScrollToTopButton;
