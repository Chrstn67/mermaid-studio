"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import mermaid from "mermaid";

import "../styles/Editor.css";

const Editor = () => {
  const [code, setCode] = useState(`graph TD
    A[Commence ici]  B{Décision?}
    B |Oui| C[Action 1]
    B |Non| D[Action 2]
    C  E[Fin]
    D  E`);
  const [error, setError] = useState("");
  const [scale, setScale] = useState(1);
  const mermaidRef = useRef(null);
  const [renderKey, setRenderKey] = useState(0);

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

  const templates = {
    graph: `graph TD
    A[Début]  B{Condition?}
    B |Oui| C[Action 1]
    B |Non| D[Action 2]
    C  E[Fin]
    D  E`,
    sequence: `sequenceDiagram
    participant U as Utilisateur
    participant S as Serveur
    U->>S: Requête
    S>U: Réponse`,
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
    [*]  Inactif
    Inactif  Actif
    Actif  [*]`,
    pie: `pie title Répartition
    "Frontend" : 40
    "Backend" : 35
    "DevOps" : 25`,
  };

  const loadTemplate = (template) => {
    setCode(templates[template]);
    setRenderKey((prev) => prev + 1);
  };

  const zoomIn = () => setScale((prev) => Math.min(prev * 1.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev / 1.2, 0.5));
  const resetZoom = () => setScale(1);

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
              <div className="preview-content">
                <div
                  ref={mermaidRef}
                  className="mermaid-preview"
                  style={{ transform: `scale(${scale})` }}
                  key={renderKey}
                ></div>
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
            <h4>Zoom</h4>
            <p>
              Utilise les boutons + et - pour zoomer sur ton diagramme et mieux
              voir les détails.
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
