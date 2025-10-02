"use client";

import { useEffect, useRef, useState, useCallback } from "react";

import { Link, useParams } from "react-router-dom";
import mermaid from "mermaid";
import { mermaidData } from "../data/data";

import "../styles/MermaidItem.css";

const MermaidItem = () => {
  const { id } = useParams();
  const mermaidRef = useRef(null);
  const containerRef = useRef(null);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("visual");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  const item = mermaidData.find((m) => m.id === Number.parseInt(id));

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

  useEffect(() => {
    if (item && mermaidRef.current && viewMode === "visual") {
      renderDiagram();
    }
  }, [item, id, viewMode]);

  const renderDiagram = useCallback(async () => {
    if (!item) return;
    try {
      mermaidRef.current.innerHTML = "";
      const diagramElement = document.createElement("div");
      diagramElement.className = "mermaid";
      diagramElement.textContent = item.code;
      mermaidRef.current.appendChild(diagramElement);
      await mermaid.contentLoaded();
      setError("");
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } catch (err) {
      setError("Erreur lors du rendu du diagramme: " + err.message);
    }
  }, [item]);

  const zoomIn = () => setScale((prev) => Math.min(prev * 1.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev / 1.2, 0.5));
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

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
    e.preventDefault();
    if (e.ctrlKey) {
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setScale((prev) => Math.max(0.3, Math.min(prev * delta, 3)));
    }
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setScale(1.2);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(1);
    }
  };

  const copyToClipboard = async () => {
    if (!item) return;
    try {
      await navigator.clipboard.writeText(item.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie :", err);
    }
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

  if (!item) {
    return (
      <div className="mermaid-item-page">
        <style>{`
          .mermaid-item-page {
            max-width: 1400px;
            margin: 0 auto;
            padding: 3rem 2rem;
            
            .error-message {
              text-align: center;
              padding: 4rem 2rem;
              
              h2 {
                color: #ef4444;
                margin-bottom: 2rem;
              }
            }
          }
        `}</style>
        <div className="error-message">
          <h2>Diagramme non trouvé</h2>
          <Link to="/mermaid/list">← Retour à la galerie</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`mermaid-item-page ${isFullscreen ? "fullscreen" : ""}`}>
      <div className="page-header">
        <Link to="/mermaid/list" className="btn-back">
          ← Retour à la galerie
        </Link>
        <div className="item-meta">
          <h1>{item.title}</h1>
          <div className="meta-info">
            <span className="item-type">
              Type: <strong>{item.type}</strong>
            </span>
            <div className="item-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="view-controls">
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === "visual" ? "active" : ""}`}
            onClick={() => setViewMode("visual")}
          >
            👁️ Visualisation
          </button>
          <button
            className={`toggle-btn ${viewMode === "code" ? "active" : ""}`}
            onClick={() => setViewMode("code")}
          >
            📝 Code
          </button>
        </div>

        <div className="action-buttons">
          <button
            className={`action-btn copy-btn ${copied ? "copied" : ""}`}
            onClick={copyToClipboard}
            title="Copier le code"
          >
            {copied ? "✓ Copié !" : "📋 Copier"}
          </button>
          <button
            className="action-btn fullscreen-btn"
            onClick={toggleFullscreen}
            title="Plein écran"
          >
            {isFullscreen ? "📱 Quitter" : "🖥️ Plein écran"}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="content-area">
        {viewMode === "visual" ? (
          <div
            className="mermaid-container"
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
          >
            <div className="zoom-controls">
              <button
                className="zoom-btn"
                onClick={zoomOut}
                title="Zoom arrière"
              >
                −
              </button>
              <button
                className="zoom-btn zoom-reset"
                onClick={resetZoom}
                title="Réinitialiser"
              >
                ⎌
              </button>
              <button className="zoom-btn" onClick={zoomIn} title="Zoom avant">
                +
              </button>
            </div>

            <div className="zoom-level">{Math.round(scale * 100)}%</div>

            <div
              ref={mermaidRef}
              className="mermaid-diagram"
              style={{
                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              }}
            ></div>
          </div>
        ) : (
          <div className="code-section">
            <pre className="code-block">
              <code>{item.code}</code>
            </pre>
          </div>
        )}
      </div>

      <div className="item-info">
        <div className="info-card">
          <h4>🎯 Contrôles</h4>
          <p>
            <strong>Zoom :</strong> Molette souris (Ctrl) ou boutons ±<br />
            <strong>Déplacement :</strong> Clic et glisser
            <br />
            <strong>Réinitialiser :</strong> Bouton ⎌
          </p>
        </div>
        <div className="info-card">
          <h4>📊 Type de diagramme</h4>
          <p>{item.type}</p>
        </div>
        <div className="info-card">
          <h4>🏷️ Tags</h4>
          <div className="tags-list">
            {item.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MermaidItem;
