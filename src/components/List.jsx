"use client";

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { mermaidData, diagramTypes } from "../data/data";

import "../styles/List.css";

const List = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return mermaidData.filter((item) => {
      const matchesType =
        selectedType === "all" ||
        item.tags.includes(selectedType) ||
        item.type === selectedType;
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesType && matchesSearch;
    });
  }, [selectedType, searchTerm]);

  const getTypeIcon = (type) => {
    const icons = {
      graph: "📊",
      sequenceDiagram: "🔄",
      gitGraph: "🌿",
      erDiagram: "🗃️",
      stateDiagram: "⚡",
      pie: "🥧",
    };
    return icons[type] || "📋";
  };

  return (
    <div className="list-page">
      <h1>Galerie de diagrammes</h1>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Recherche par titre ou tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="type-filters">
          <label>Filtre par type :</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="type-select"
          >
            {diagramTypes.map((type) => (
              <option key={type} value={type}>
                {type === "all" ? "Tous les types" : type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="stats">
        {filteredData.length} diagramme(s) trouvé(s)
        {selectedType !== "all" && ` pour le type "${selectedType}"`}
      </div>

      <div className="mermaid-grid">
        {filteredData.map((item) => (
          <div key={item.id} className="mermaid-card">
            <div className="card-header">
              <span className="type-icon">{getTypeIcon(item.type)}</span>
              <h3>{item.title}</h3>
            </div>

            <div className="card-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="card-type">
              Type: <strong>{item.type}</strong>
            </div>

            <div className="card-actions">
              <Link to={`/mermaid/list/${item.id}`} className="btn-view">
                Voir le diagramme →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="no-results">
          <p>Aucun diagramme trouvé pour ta recherche.</p>
          <button
            onClick={() => {
              setSelectedType("all");
              setSearchTerm("");
            }}
            className="btn-clear"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default List;
