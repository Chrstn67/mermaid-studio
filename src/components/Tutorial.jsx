"use client";

import { useState } from "react";
import { tutorialData } from "../data/tutorialData";

import "../styles/Tutorial.css";

const Tutorial = () => {
  const [selectedType, setSelectedType] = useState("all");
  const tutorial = tutorialData[selectedType];

  return (
    <div className="tutorial-page">
      <div className="tutorial-header">
        <h1>📚 Tutoriels Mermaid</h1>
        <p>
          Apprends à créer chaque type de diagramme avec des exemples concrets
        </p>
      </div>

      <div className="type-selector">
        <h3>Choisis un type de diagramme</h3>
        <div className="type-grid">
          <button
            className={selectedType === "all" ? "active" : ""}
            onClick={() => setSelectedType("all")}
          >
            <span className="icon">📋</span>
            <span>Tous</span>
          </button>
          <button
            className={selectedType === "graph" ? "active" : ""}
            onClick={() => setSelectedType("graph")}
          >
            <span className="icon">📊</span>
            <span>Flowchart</span>
          </button>
          <button
            className={selectedType === "sequenceDiagram" ? "active" : ""}
            onClick={() => setSelectedType("sequenceDiagram")}
          >
            <span className="icon">🔄</span>
            <span>Séquence</span>
          </button>
          <button
            className={selectedType === "classDiagram" ? "active" : ""}
            onClick={() => setSelectedType("classDiagram")}
          >
            <span className="icon">🏛️</span>
            <span>Classes</span>
          </button>
          <button
            className={selectedType === "stateDiagram" ? "active" : ""}
            onClick={() => setSelectedType("stateDiagram")}
          >
            <span className="icon">⚡</span>
            <span>États</span>
          </button>
          <button
            className={selectedType === "erDiagram" ? "active" : ""}
            onClick={() => setSelectedType("erDiagram")}
          >
            <span className="icon">🗃️</span>
            <span>Diagramme ER</span>
          </button>
          <button
            className={selectedType === "journey" ? "active" : ""}
            onClick={() => setSelectedType("journey")}
          >
            <span className="icon">🧭</span>
            <span>Parcours</span>
          </button>
          <button
            className={selectedType === "gantt" ? "active" : ""}
            onClick={() => setSelectedType("gantt")}
          >
            <span className="icon">📅</span>
            <span>Gantt</span>
          </button>
          <button
            className={selectedType === "pie" ? "active" : ""}
            onClick={() => setSelectedType("pie")}
          >
            <span className="icon">🥧</span>
            <span>Camembert</span>
          </button>
          <button
            className={selectedType === "quadrantChart" ? "active" : ""}
            onClick={() => setSelectedType("quadrantChart")}
          >
            <span className="icon">🎯</span>
            <span>Quadrant</span>
          </button>
          <button
            className={selectedType === "requirementDiagram" ? "active" : ""}
            onClick={() => setSelectedType("requirementDiagram")}
          >
            <span className="icon">📝</span>
            <span>Exigences</span>
          </button>
          <button
            className={selectedType === "gitGraph" ? "active" : ""}
            onClick={() => setSelectedType("gitGraph")}
          >
            <span className="icon">🌿</span>
            <span>Git Graph</span>
          </button>
          <button
            className={selectedType === "mindmap" ? "active" : ""}
            onClick={() => setSelectedType("mindmap")}
          >
            <span className="icon">🧠</span>
            <span>Carte mentale</span>
          </button>
          <button
            className={selectedType === "timeline" ? "active" : ""}
            onClick={() => setSelectedType("timeline")}
          >
            <span className="icon">⏰</span>
            <span>Timeline</span>
          </button>
          <button
            className={selectedType === "block" ? "active" : ""}
            onClick={() => setSelectedType("block")}
          >
            <span className="icon">🧱</span>
            <span>Blocs</span>
          </button>
        </div>
      </div>

      <div className="tutorial-content">
        <div className="content-header">
          <h2>{tutorial.title}</h2>
          <p>{tutorial.description}</p>
        </div>

        <div className="syntax-section">
          <h3>🔤 Syntaxe de base</h3>
          <div className="syntax-list">
            {tutorial.syntax.map((item, index) => (
              <div key={index} className="syntax-item">
                <div className="syntax-label">{item.label}</div>
                <div className="syntax-code">{item.code}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="example-section">
          <h3>✨ Exemple complet</h3>
          <div className="example-box">
            <pre>{tutorial.example}</pre>
          </div>
        </div>

        <div className="tips-box">
          <h4>
            <span>💡</span>
            <span>Conseils pratiques</span>
          </h4>
          <ul>
            <li>
              Utilise l'éditeur WYSIWYG pour tester ta syntaxe en temps réel
            </li>
            <li>
              Commence avec un exemple simple et ajoute progressivement de la
              complexité
            </li>
            <li>
              N'hésite pas à consulter la galerie pour t'inspirer d'autres
              diagrammes
            </li>
            <li>
              La documentation officielle Mermaid est disponible sur
              mermaid.js.org
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
