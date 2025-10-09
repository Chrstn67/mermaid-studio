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
  const [touchStart, setTouchStart] = useState(null);
  const [lastTouchDistance, setLastTouchDistance] = useState(null);
  const [copied, setCopied] = useState(false);

  const item = mermaidData.find((m) => m.id === Number.parseInt(id));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

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

  // Gestion du zoom avec la molette
  const handleWheel = useCallback((e) => {
    e.preventDefault();
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
      // Déplacement avec un doigt
      setIsDragging(true);
      setTouchStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    } else if (e.touches.length === 2) {
      // Zoom avec deux doigts
      e.preventDefault();
      setLastTouchDistance(getTouchDistance(e.touches));
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      // Déplacement
      setPosition({
        x: e.touches[0].clientX - touchStart.x,
        y: e.touches[0].clientY - touchStart.y,
      });
    } else if (e.touches.length === 2) {
      // Zoom pinch
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

  // Événements globaux
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
        <div className="error-message">
          <h2>Diagramme non trouvé</h2>
          <Link to="/mermaid-studio/list">← Retour à la galerie</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`mermaid-item-page ${isFullscreen ? "fullscreen" : ""}`}>
      <div className="page-header">
        <Link to="/list" className="btn-back">
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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

            <div className="mobile-hint">
              📱 Utilisez 2 doigts pour zoomer, 1 doigt pour déplacer
            </div>

            <div
              ref={mermaidRef}
              className="mermaid-diagram"
              style={{
                transform: `scale(${scale}) translate(${
                  position.x / scale
                }px, ${position.y / scale}px)`,
                transformOrigin: "center center",
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
            <strong>Zoom :</strong> Molette souris ou boutons ±<br />
            <strong>Déplacement :</strong> Clic et glisser
            <br />
            <strong>Mobile :</strong> Pincez pour zoomer, glissez pour déplacer
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
