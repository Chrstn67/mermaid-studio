"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import mermaid from "mermaid";

import "../styles/Editor.css";

const Editor = () => {
  const [code, setCode] = useState(`graph TD
    A[Commence ici] --> B{Décision?}
    B -->|Oui| C[Action 1]
    B -->|Non| D[Action 2]
    C --> E[Fin]
    D --> E`);
  const [error, setError] = useState("");
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const [lastTouchDistance, setLastTouchDistance] = useState(null);

  const mermaidRef = useRef(null);
  const previewContainerRef = useRef(null);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
      fontFamily: "Arial",
      flowchart: { useMaxWidth: false, htmlLabels: true },
      sequence: { useMaxWidth: false },
      gitGraph: { useMaxWidth: false },
      er: { useMaxWidth: false },
    });
  }, []);

  const renderDiagram = useCallback(async () => {
    if (!mermaidRef.current || !code.trim()) return;

    try {
      mermaidRef.current.innerHTML = "";
      const diagramElement = document.createElement("div");
      diagramElement.className = "mermaid";
      diagramElement.textContent = code;
      mermaidRef.current.appendChild(diagramElement);
      await mermaid.contentLoaded();
      setError("");
      // Réinitialiser le zoom et position après un nouveau rendu
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } catch (err) {
      setError("Erreur de syntaxe : " + err.message);
    }
  }, [code]);

  useEffect(() => {
    const timer = setTimeout(() => {
      renderDiagram();
    }, 500);
    return () => clearTimeout(timer);
  }, [code, renderDiagram]);

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
    if (previewContainerRef.current)
      previewContainerRef.current.style.cursor = "grabbing";
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
    if (previewContainerRef.current)
      previewContainerRef.current.style.cursor = "grab";
  }, []);

  const handleWheel = useCallback((e) => {
    if (!previewContainerRef.current?.contains(e.target)) return;
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
        if (previewContainerRef.current)
          previewContainerRef.current.style.cursor = "grab";
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

  const templates = {
    graph: `graph TD
    A[Début] --> B{Condition?}
    B -->|Oui| C[Action 1]
    B -->|Non| D[Action 2]
    C --> E[Fin]
    D --> E`,
    sequence: `sequenceDiagram
    participant U as Utilisateur
    participant S as Serveur
    U->>S: Requête
    S->>U: Réponse`,
    git: `gitGraph
    commit
    branch develop
    checkout develop
    commit
    checkout main
    merge develop`,
    er: `erDiagram
    USER ||--o{ POST : écrit
    USER {
        int id
        string nom
    }
    POST {
        int id
        string titre
    }`,
    state: `stateDiagram-v2
    [*] --> Inactif
    Inactif --> Actif
    Actif --> [*]`,
    pie: `pie title Répartition
    "Frontend" : 40
    "Backend" : 35
    "DevOps" : 25`,
  };

  const loadTemplate = (template) => {
    setCode(templates[template]);
    setRenderKey((prev) => prev + 1);
  };

  return (
    <div className="editor-page">
      <div className="editor-header">
        <h1>✨ Éditeur WYSIWYG</h1>
        <p>
          Crée tes diagrammes en temps réel et vois le résultat instantanément
        </p>
      </div>

      <div className="templates-bar">
        <h3>🎨 Modèles rapides</h3>
        <div className="templates-grid">
          <button onClick={() => loadTemplate("graph")}>📊 Flowchart</button>
          <button onClick={() => loadTemplate("sequence")}>🔄 Séquence</button>
          <button onClick={() => loadTemplate("git")}>🌿 Git Graph</button>
          <button onClick={() => loadTemplate("er")}>🗃️ Diagramme ER</button>
          <button onClick={() => loadTemplate("state")}>⚡ États</button>
          <button onClick={() => loadTemplate("pie")}>🥧 Camembert</button>
        </div>
      </div>

      <div className="editor-container">
        <div className="editor-panel">
          <div className="panel-header">
            <span>📝</span> Code Mermaid
          </div>
          <div className="code-editor">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Écris ton code Mermaid ici..."
              spellCheck="false"
            />
          </div>
        </div>

        <div className="editor-panel">
          <div className="panel-header">
            <span>👁️</span> Aperçu en direct
          </div>
          <div className="preview-area">
            <div className="zoom-controls">
              <button onClick={zoomOut} title="Zoom arrière">
                −
              </button>
              <button onClick={resetZoom} title="Réinitialiser">
                ⎌
              </button>
              <button onClick={zoomIn} title="Zoom avant">
                +
              </button>
            </div>
            <div className="zoom-level">{Math.round(scale * 100)}%</div>

            {error ? (
              <div className="error-display">
                <strong>⚠️ Erreur de syntaxe</strong>
                <p>{error}</p>
              </div>
            ) : (
              <div
                className="preview-container"
                ref={previewContainerRef}
                onMouseDown={handleMouseDown}
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="mobile-instructions">
                  📱 Pincez pour zoomer • Glissez pour déplacer
                </div>

                <div className="preview-content">
                  <div
                    ref={mermaidRef}
                    className="mermaid-preview"
                    style={{
                      transform: `scale(${scale}) translate(${
                        position.x / scale
                      }px, ${position.y / scale}px)`,
                    }}
                    key={renderKey}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="tips-section">
        <h3>💡 Astuces pour bien démarrer</h3>
        <div className="tips-grid">
          <div className="tip">
            <h4>Temps réel</h4>
            <p>
              Ton diagramme se met à jour automatiquement pendant que tu tapes.
              Pas besoin de cliquer sur un bouton !
            </p>
          </div>
          <div className="tip">
            <h4>Modèles</h4>
            <p>
              Utilise les modèles rapides ci-dessus pour commencer rapidement
              avec un exemple fonctionnel.
            </p>
          </div>
          <div className="tip">
            <h4>Zoom & Déplacement</h4>
            <p>
              Utilise la molette pour zoomer, clic-glisser pour déplacer, ou
              pincer sur mobile.
            </p>
          </div>
          <div className="tip">
            <h4>Syntaxe</h4>
            <p>
              Consulte la section Tutoriels pour apprendre la syntaxe de chaque
              type de diagramme.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
