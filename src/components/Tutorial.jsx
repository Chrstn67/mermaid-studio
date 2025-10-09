"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { tutorialData } from "../data/tutorialData";
import mermaid from "mermaid";
import "../styles/Tutorial.css";

const Tutorial = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const mermaidRef = useRef(null);
  const containerRef = useRef(null);
  const tutorial = tutorialData[selectedType];

  // États pour le zoom et le déplacement
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const [lastTouchDistance, setLastTouchDistance] = useState(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
      fontFamily: "Arial",
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        curve: "basis",
      },
      sequence: {
        useMaxWidth: false,
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
      },
      gantt: {
        useMaxWidth: false,
        barHeight: 20,
        barGap: 4,
      },
      er: { useMaxWidth: false },
      gitGraph: { useMaxWidth: false },
    });
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      if (mermaidRef.current && tutorial.example) {
        try {
          mermaidRef.current.innerHTML = "";
          const id = `mermaid-${Date.now()}`;
          const { svg } = await mermaid.render(id, tutorial.example);
          mermaidRef.current.innerHTML = svg;
          setScale(1);
          setPosition({ x: 0, y: 0 });
        } catch (error) {
          console.error("Erreur de rendu Mermaid:", error);
          mermaidRef.current.innerHTML = `
            <div style="color: red; padding: 1rem;">
              Erreur de rendu du diagramme. Vérifiez la syntaxe.
            </div>
          `;
        }
      }
    };
    renderDiagram();
  }, [selectedType, tutorial.example]);

  // Défilement automatique vers le haut à chaque changement d'étape
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  // Gestion du zoom
  const zoomIn = () => setScale((prev) => Math.min(prev * 1.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev / 1.2, 0.3));
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Gestion du déplacement à la souris
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    if (containerRef.current) containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) containerRef.current.style.cursor = "grab";
  }, []);

  const handleWheel = useCallback((e) => {
    if (!containerRef.current?.contains(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((prev) => Math.max(0.3, Math.min(prev * delta, 3)));
  }, []);

  // Gestion tactile (mobile)
  const getTouchDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setTouchStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    } else if (e.touches.length === 2) {
      e.preventDefault();
      setLastTouchDistance(getTouchDistance(e.touches));
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      setPosition({
        x: e.touches[0].clientX - touchStart.x,
        y: e.touches[0].clientY - touchStart.y,
      });
    } else if (e.touches.length === 2) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches);
      if (lastTouchDistance) {
        const delta = currentDistance / lastTouchDistance;
        setScale((prev) => Math.max(0.5, Math.min(prev * delta, 5)));
      }
      setLastTouchDistance(currentDistance);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastTouchDistance(null);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (containerRef.current) containerRef.current.style.cursor = "grab";
      }
    };
    const handleGlobalMouseMove = (e) => {
      if (isDragging) handleMouseMove(e);
    };
    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isDragging, handleMouseMove]);

  const handleCopy = () => {
    navigator.clipboard.writeText(tutorial.example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const diagramTypes = [
    { id: "all", icon: "🎯", label: "Vue d'ensemble" },
    { id: "graph", icon: "📊", label: "Flowchart" },
    { id: "sequenceDiagram", icon: "🔄", label: "Séquence" },
    { id: "classDiagram", icon: "📦", label: "Classes UML" },
    { id: "stateDiagram", icon: "⚡", label: "États" },
    { id: "erDiagram", icon: "🗃️", label: "Diagramme ER" },
    { id: "journey", icon: "🚶", label: "Parcours" },
    { id: "gantt", icon: "📅", label: "Gantt" },
    { id: "pie", icon: "🥧", label: "Camembert" },
    { id: "quadrantChart", icon: "📈", label: "Quadrant" },
    { id: "requirementDiagram", icon: "📋", label: "Exigences" },
    { id: "gitGraph", icon: "🌿", label: "Git Graph" },
    { id: "mindmap", icon: "🧠", label: "Mind Map" },
    { id: "timeline", icon: "⏳", label: "Timeline" },
    { id: "block", icon: "🧱", label: "Blocs" },
    { id: "subgraph", icon: "🔲", label: "Sous-graphes" },
    { id: "styled", icon: "🎨", label: "Styles" },
    { id: "interactive", icon: "🔗", label: "Interactif" },
  ];

  return (
    <div className="tutorial-container">
      {/* Hero Section */}
      <div className="tutorial-hero">
        <div className="hero-badge">📚 Tutoriel Interactif</div>
        <h1 className="hero-title">Maîtrise Mermaid en 3 étapes</h1>
        <p className="hero-subtitle">
          Apprends à créer des diagrammes professionnels avec des exemples
          concrets et interactifs
        </p>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        <div
          className={`step ${activeStep >= 1 ? "active" : ""} ${
            activeStep > 1 ? "completed" : ""
          }`}
          onClick={() => setActiveStep(1)}
        >
          <div className="step-number">1</div>
          <div className="step-label">Choisis ton diagramme</div>
        </div>
        <div className="step-line"></div>
        <div
          className={`step ${activeStep >= 2 ? "active" : ""} ${
            activeStep > 2 ? "completed" : ""
          }`}
          onClick={() => setActiveStep(2)}
        >
          <div className="step-number">2</div>
          <div className="step-label">Apprends la syntaxe</div>
        </div>
        <div className="step-line"></div>
        <div
          className={`step ${activeStep >= 3 ? "active" : ""}`}
          onClick={() => setActiveStep(3)}
        >
          <div className="step-number">3</div>
          <div className="step-label">Visualise le résultat</div>
        </div>
      </div>

      {/* Step 1: Diagram Selection */}
      <div className={`tutorial-step ${activeStep === 1 ? "visible" : ""}`}>
        <div className="step-card">
          <div className="step-header">
            <span className="step-icon">🎯</span>
            <h2>Étape 1 : Choisis ton type de diagramme</h2>
          </div>
          <p className="step-description">
            Sélectionne le type de diagramme qui correspond à tes besoins parmi
            les 15 types disponibles
          </p>

          <div className="diagram-grid">
            {diagramTypes.map((type) => (
              <button
                key={type.id}
                className={`diagram-card ${
                  selectedType === type.id ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedType(type.id);
                  setActiveStep(2);
                }}
              >
                <span className="diagram-icon">{type.icon}</span>
                <span className="diagram-label">{type.label}</span>
                {selectedType === type.id && (
                  <span className="selected-badge">✓</span>
                )}
              </button>
            ))}
          </div>

          <button className="next-step-btn" onClick={() => setActiveStep(2)}>
            Continuer vers la syntaxe →
          </button>
        </div>
      </div>

      {/* Step 2: Syntax Learning */}
      <div className={`tutorial-step ${activeStep === 2 ? "visible" : ""}`}>
        <div className="step-card">
          <div className="step-header">
            <span className="step-icon">📝</span>
            <h2>Étape 2 : Apprends la syntaxe</h2>
          </div>
          <div className="selected-diagram-info">
            <span className="info-icon">
              {diagramTypes.find((t) => t.id === selectedType)?.icon}
            </span>
            <div>
              <h3>{tutorial.title}</h3>
              <p>{tutorial.description}</p>
            </div>
          </div>

          <div className="syntax-cards">
            <h3 className="section-title">🔤 Syntaxe de base</h3>
            {tutorial.syntax.map((item, index) => (
              <div key={index} className="syntax-card">
                <div className="syntax-number">{index + 1}</div>
                <div className="syntax-content">
                  <div className="syntax-label">{item.label}</div>
                  <code className="syntax-code">{item.code}</code>
                </div>
              </div>
            ))}
          </div>

          <div className="code-example">
            <div className="code-header">
              <h3 className="section-title">✨ Exemple complet</h3>
              <button
                className={`copy-btn ${copied ? "copied" : ""}`}
                onClick={handleCopy}
              >
                <span>{copied ? "✓" : "📋"}</span>
                <span>{copied ? "Copié !" : "Copier le code"}</span>
              </button>
            </div>
            <pre className="code-block">{tutorial.example}</pre>
          </div>

          <button className="next-step-btn" onClick={() => setActiveStep(3)}>
            Voir le résultat →
          </button>
        </div>
      </div>

      {/* Step 3: Interactive Preview */}
      <div className={`tutorial-step ${activeStep === 3 ? "visible" : ""}`}>
        <div className="step-card">
          <div className="step-header">
            <span className="step-icon">👁️</span>
            <h2>Étape 3 : Visualise ton diagramme</h2>
          </div>
          <p className="step-description">
            Explore le diagramme de manière interactive avec les contrôles de
            zoom et de déplacement
          </p>

          <div
            className="preview-container"
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="preview-controls">
              <div className="zoom-display">{Math.round(scale * 100)}%</div>
              <div className="zoom-buttons">
                <button
                  className="control-btn"
                  onClick={zoomOut}
                  title="Zoom arrière"
                >
                  −
                </button>
                <button
                  className="control-btn"
                  onClick={resetZoom}
                  title="Réinitialiser"
                >
                  ⎌
                </button>
                <button
                  className="control-btn"
                  onClick={zoomIn}
                  title="Zoom avant"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mobile-instructions">
              📱 Pincez pour zoomer • Glissez pour déplacer
            </div>

            <div
              ref={mermaidRef}
              className="diagram-preview"
              style={{
                transform: `scale(${scale}) translate(${
                  position.x / scale
                }px, ${position.y / scale}px)`,
              }}
            ></div>
          </div>

          <div className="tips-card">
            <h4 className="tips-title">
              <span>💡</span> Astuces d'utilisation
            </h4>
            <ul className="tips-list">
              <li>
                <strong>Desktop :</strong> Molette pour zoomer, clic-glisser
                pour déplacer
              </li>
              <li>
                <strong>Mobile :</strong> Pincer avec 2 doigts pour zoomer,
                glisser avec 1 doigt
              </li>
              <li>
                Copie le code et teste-le dans l'éditeur WYSIWYG pour l'adapter
                à tes besoins
              </li>
              <li>
                Consulte la galerie pour découvrir d'autres exemples et
                t'inspirer
              </li>
            </ul>
          </div>

          <div className="action-buttons">
            <button className="secondary-btn" onClick={() => setActiveStep(1)}>
              ← Choisir un autre diagramme
            </button>
            <button className="primary-btn" onClick={() => setActiveStep(2)}>
              Revoir la syntaxe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
