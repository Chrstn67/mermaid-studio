"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import mermaid from "mermaid";
import Editor from "@monaco-editor/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "../styles/MermaidEditor.css";

const MermaidEditor = () => {
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
  const [editorInstance, setEditorInstance] = useState(null);
  const [monacoInstance, setMonacoInstance] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [splitPosition, setSplitPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState("editor");
  const [isMobile, setIsMobile] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const mermaidRef = useRef(null);
  const previewContainerRef = useRef(null);
  const containerRef = useRef(null);
  const [renderKey, setRenderKey] = useState(0);

  // Détection responsive
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile && splitPosition !== 100) {
        setSplitPosition(100);
      } else if (!mobile && splitPosition === 100) {
        setSplitPosition(50);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [splitPosition]);

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

  const renderDiagram = useCallback(async () => {
    if (!mermaidRef.current || !code.trim()) return;

    try {
      mermaidRef.current.innerHTML = "";
      const diagramElement = document.createElement("div");
      diagramElement.className = "mermaid";
      diagramElement.textContent = code;
      mermaidRef.current.appendChild(diagramElement);

      await mermaid.run({
        nodes: [diagramElement],
      });

      setError("");
    } catch (err) {
      console.error("Erreur de rendu Mermaid:", err);
      setError("Erreur de syntaxe : " + err.message);

      mermaidRef.current.innerHTML = `
        <div class="error-preview">
          <strong>⚠️ Erreur de rendu</strong>
          <p>${err.message}</p>
          <p>Vérifiez la syntaxe de votre diagramme.</p>
        </div>
      `;
    }
  }, [code]);

  // CORRECTION : Re-rendre le diagramme quand on change d'onglet mobile
  useEffect(() => {
    if (activeMobileTab === "preview") {
      const timer = setTimeout(() => {
        renderDiagram();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeMobileTab, renderDiagram]);

  // Re-rendre aussi quand le code change
  useEffect(() => {
    const timer = setTimeout(() => {
      renderDiagram();
    }, 500);
    return () => clearTimeout(timer);
  }, [code, renderDiagram]);

  const handleEditorDidMount = (editor, monaco) => {
    setEditorInstance(editor);
    setMonacoInstance(monaco);

    monaco.languages.register({ id: "mermaid" });

    monaco.languages.setMonarchTokensProvider("mermaid", {
      keywords: [
        "graph",
        "flowchart",
        "sequenceDiagram",
        "classDiagram",
        "stateDiagram",
        "erDiagram",
        "journey",
        "gantt",
        "pie",
        "gitGraph",
        "mindmap",
        "timeline",
        "quadrantChart",
        "requirementDiagram",
        "block",
        "TD",
        "TB",
        "BT",
        "RL",
        "LR",
        "participant",
        "actor",
        "Note",
        "loop",
        "alt",
        "opt",
        "par",
        "and",
        "rect",
        "activate",
        "deactivate",
        "title",
        "section",
        "class",
        "classDef",
        "click",
        "callback",
        "link",
        "style",
        "subgraph",
        "end",
        "dateFormat",
        "axisFormat",
      ],
      operators: ["-->", "->>", "--", "->", "|", "o", "x", "*"],
      symbols: /[=><!~?:&|+\-*/^%]+/,

      tokenizer: {
        root: [
          [
            /[a-zA-Z_]\w*/,
            {
              cases: {
                "@keywords": "keyword",
                "@default": "identifier",
              },
            },
          ],
          [/\[([^\]]+)\]/, "string"],
          [/\{([^}]+)\}/, "string"],
          [/\(([^)]+)\)/, "string"],
          [/"([^"\\]|\\.)*$/, "string.invalid"],
          [/"/, "string", "@string"],
          [/%%.*$/, "comment"],
          [
            /@symbols/,
            {
              cases: {
                "@operators": "operator",
                "@default": "",
              },
            },
          ],
        ],
        string: [
          [/[^\\"]+/, "string"],
          [/"/, "string", "@pop"],
        ],
      },
    });

    monaco.editor.defineTheme("mermaidTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "569CD6", fontStyle: "bold" },
        { token: "string", foreground: "CE9178" },
        { token: "comment", foreground: "6A9955", fontStyle: "italic" },
        { token: "operator", foreground: "D4D4D4" },
        { token: "identifier", foreground: "9CDCFE" },
      ],
      colors: {
        "editor.background": "#1E1E1E",
        "editor.foreground": "#D4D4D4",
        "editorLineNumber.foreground": "#858585",
        "editor.selectionBackground": "#264F78",
        "editor.inactiveSelectionBackground": "#3A3D41",
      },
    });

    monaco.editor.setTheme("mermaidTheme");

    monaco.languages.registerCompletionItemProvider("mermaid", {
      provideCompletionItems: (model, position) => {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const isFlowchart = /^(graph|flowchart)/.test(textUntilPosition);
        const isSequence = /^sequenceDiagram/.test(textUntilPosition);

        const suggestions = [
          {
            label: "graph TD",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "graph TD\n    A[Start] --> B[End]",
            documentation: "Flowchart de haut en bas",
            range,
          },
          {
            label: "sequenceDiagram",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText:
              "sequenceDiagram\n    participant A\n    participant B\n    A->>B: Message",
            documentation: "Diagramme de séquence",
            range,
          },
          {
            label: "classDiagram",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText:
              "classDiagram\n    class Animal {\n        +String name\n        +makeSound()\n    }",
            documentation: "Diagramme de classes UML",
            range,
          },
          {
            label: "stateDiagram-v2",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText:
              "stateDiagram-v2\n    [*] --> State1\n    State1 --> [*]",
            documentation: "Diagramme d'états",
            range,
          },
          {
            label: "erDiagram",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "erDiagram\n    CUSTOMER ||--o{ ORDER : places",
            documentation: "Diagramme entité-relation",
            range,
          },
          {
            label: "gitGraph",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText:
              "gitGraph\n    commit\n    branch develop\n    checkout develop\n    commit",
            documentation: "Graphe Git",
            range,
          },
          {
            label: "pie",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText:
              'pie title Distribution\n    "A" : 40\n    "B" : 30\n    "C" : 30',
            documentation: "Diagramme en camembert",
            range,
          },
        ];

        if (isFlowchart) {
          suggestions.push(
            {
              label: "subgraph",
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "subgraph ${1:title}\n    ${2:A --> B}\nend",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Créer un sous-graphe",
              range,
            },
            {
              label: "classDef",
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText:
                "classDef ${1:className} fill:${2:#f9f},stroke:${3:#333},stroke-width:${4:2px}",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Définir un style de classe personnalisé",
              range,
            },
            {
              label: "class",
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "class ${1:nodeId} ${2:className}",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Appliquer une classe à un nœud",
              range,
            },
            {
              label: "click",
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText:
                'click ${1:nodeId} "${2:https://example.com}" "${3:Tooltip}"',
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Ajouter un lien cliquable à un nœud",
              range,
            }
          );
        }

        if (isSequence) {
          suggestions.push(
            {
              label: "participant",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: "participant ${1:Name}",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Déclarer un participant",
              range,
            },
            {
              label: "Note",
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText:
                "Note ${1|left of,right of,over|} ${2:participant}: ${3:text}",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Ajouter une note",
              range,
            },
            {
              label: "loop",
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "loop ${1:condition}\n    ${2:A->>B: Message}\nend",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Créer une boucle",
              range,
            },
            {
              label: "alt",
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText:
                "alt ${1:condition}\n    ${2:A->>B: Message}\nelse ${3:other condition}\n    ${4:A->>C: Other}\nend",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Créer une alternative",
              range,
            }
          );
        }

        return { suggestions };
      },
    });

    const validateMermaidCode = async (code) => {
      try {
        const tempDiv = document.createElement("div");
        const id = `validation-${Date.now()}`;
        await mermaid.render(id, code);
        setValidationErrors([]);
        return [];
      } catch (err) {
        const errorMessage = err.message || "Erreur de syntaxe";
        const lineMatch = errorMessage.match(/line (\d+)/i);
        const lineNumber = lineMatch ? Number.parseInt(lineMatch[1]) : 1;

        const errors = [
          {
            startLineNumber: lineNumber,
            endLineNumber: lineNumber,
            startColumn: 1,
            endColumn: 1000,
            message: errorMessage,
            severity: monaco.MarkerSeverity.Error,
          },
        ];

        setValidationErrors(errors);
        return errors;
      }
    };

    let validationTimeout;
    editor.onDidChangeModelContent(() => {
      clearTimeout(validationTimeout);
      validationTimeout = setTimeout(async () => {
        const currentCode = editor.getValue();
        const errors = await validateMermaidCode(currentCode);
        monaco.editor.setModelMarkers(editor.getModel(), "mermaid", errors);
      }, 1000);
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      console.log("[v0] Sauvegarde demandée");
    });
  };

  const exportAsSVG = async () => {
    try {
      const id = `export-svg-${Date.now()}`;
      const { svg } = await mermaid.render(id, code);

      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `mermaid-diagram-${Date.now()}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erreur lors de l'export SVG:", err);
      alert(
        "Erreur lors de l'export SVG. Vérifiez que votre diagramme est valide."
      );
    }
  };

  const exportAsPNG = async () => {
    setIsExporting(true);
    try {
      const id = `export-png-${Date.now()}`;
      const { svg } = await mermaid.render(id, code);

      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svg, "image/svg+xml");
      const svgElement = svgDoc.documentElement;

      const viewBox = svgElement.getAttribute("viewBox");
      let width, height;

      if (viewBox) {
        const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);
        width = vbWidth;
        height = vbHeight;
      } else {
        width = Number.parseInt(svgElement.getAttribute("width")) || 800;
        height = Number.parseInt(svgElement.getAttribute("height")) || 600;
      }

      const padding = 40;
      const canvas = document.createElement("canvas");
      canvas.width = width + padding * 2;
      canvas.height = height + padding * 2;

      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });

      ctx.drawImage(img, padding, padding, width, height);

      canvas.toBlob(
        (blob) => {
          const pngUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = pngUrl;
          link.download = `mermaid-diagram-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(pngUrl);
          URL.revokeObjectURL(url);
        },
        "image/png",
        1.0
      );
    } catch (err) {
      console.error("Erreur lors de l'export PNG:", err);
      alert(
        "Erreur lors de l'export PNG. Vérifiez que votre diagramme est valide."
      );
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPDF = async () => {
    if (!mermaidRef.current) return;

    setIsExporting(true);

    try {
      const id = `export-pdf-${Date.now()}`;
      const { svg } = await mermaid.render(id, code);

      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svg, "image/svg+xml");
      const svgElement = svgDoc.documentElement;

      const viewBox = svgElement.getAttribute("viewBox");
      let width, height;

      if (viewBox) {
        const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);
        width = vbWidth;
        height = vbHeight;
      } else {
        width = Number.parseInt(svgElement.getAttribute("width")) || 800;
        height = Number.parseInt(svgElement.getAttribute("height")) || 600;
      }

      const canvas = document.createElement("canvas");
      const padding = 40;
      canvas.width = width + padding * 2;
      canvas.height = height + padding * 2;

      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });

      ctx.drawImage(img, padding, padding, width, height);

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: width > height ? "landscape" : "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;

      let imgWidth = (width / 96) * 25.4;
      let imgHeight = (height / 96) * 25.4;

      const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight, 1);
      imgWidth *= ratio;
      imgHeight *= ratio;

      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

      pdf.setProperties({
        title: "Diagramme Mermaid",
        subject: "Diagramme généré avec l'éditeur Mermaid",
        author: "Éditeur Mermaid WYSIWYG",
        keywords: "mermaid, diagram, flowchart",
      });

      pdf.save(`mermaid-diagram-${Date.now()}.pdf`);

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erreur lors de l'export PDF:", err);
      alert("Erreur lors de l'export PDF. Veuillez réessayer.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleResizeMove = useCallback(
    (e) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      let newPosition;

      if (isMobile) {
        newPosition =
          ((e.clientY - containerRect.top) / containerRect.height) * 100;
      } else {
        newPosition =
          ((e.clientX - containerRect.left) / containerRect.width) * 100;
      }

      if (newPosition >= 20 && newPosition <= 80) {
        setSplitPosition(newPosition);
      }
    },
    [isResizing, isMobile]
  );

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleResizeMove);
      document.addEventListener("mouseup", handleResizeEnd);
      document.body.style.cursor = isMobile ? "row-resize" : "col-resize";
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleResizeMove);
        document.removeEventListener("mouseup", handleResizeEnd);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd, isMobile]);

  const zoomIn = () => setScale((prev) => Math.min(prev * 1.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev / 1.2, 0.3));
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

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

    const handleGlobalWheel = (e) => {
      if (previewContainerRef.current?.contains(e.target)) {
        e.preventDefault();
      }
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("wheel", handleGlobalWheel, { passive: false });

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("wheel", handleGlobalWheel);
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
    subgraph: `graph TD
    subgraph "Sous-système A"
        A1[Composant 1] --> A2[Composant 2]
    end
    subgraph "Sous-système B"
        B1[Composant 3] --> B2[Composant 4]
    end
    A2 --> B1`,
    styled: `graph TD
    A[Node Normal] --> B[Node Stylé]
    C[Autre Node] --> B
    
    classDef important fill:#f96,stroke:#333,stroke-width:4px
    classDef success fill:#9f6,stroke:#333,stroke-width:2px
    
    class B important
    class C success`,
    interactive: `graph TD
    A[Accueil] --> B[Page 1]
    A --> C[Page 2]
    B --> D[Détails]
    
    click A "https://example.com" "Aller à l'accueil"
    click B "https://example.com/page1" "Voir Page 1"
    click C "https://example.com/page2" "Voir Page 2"`,
  };

  const loadTemplate = (template) => {
    setCode(templates[template]);
    setRenderKey((prev) => prev + 1);
  };

  // CORRECTION : Fonction pour changer d'onglet avec re-rendu
  const handleTabChange = (tab) => {
    setActiveMobileTab(tab);
    // Forcer un re-rendu du diagramme quand on passe à l'aperçu
    if (tab === "preview") {
      setTimeout(() => {
        renderDiagram();
      }, 50);
    }
  };

  // Rendu conditionnel pour mobile/desktop
  const renderEditorView = () => (
    <div
      className="editor-panel"
      style={!isMobile ? { width: `${splitPosition}%` } : {}}
    >
      <div className="panel-header">
        <span>📝</span> Code Mermaid
        {validationErrors.length > 0 && (
          <span className="error-badge">
            ⚠️ {validationErrors.length} erreur
            {validationErrors.length > 1 ? "s" : ""}
          </span>
        )}
      </div>
      <div className="monaco-editor-wrapper">
        <Editor
          height={isMobile ? "350px" : "500px"}
          language="mermaid"
          value={code}
          onChange={(value) => setCode(value || "")}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: isMobile ? 13 : 14,
            lineNumbers: "on",
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            folding: true,
            foldingStrategy: "indentation",
            showFoldingControls: "always",
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>
    </div>
  );

  const renderPreviewView = () => (
    <div
      className="editor-panel"
      style={!isMobile ? { width: `${100 - splitPosition}%` } : {}}
    >
      <div className="panel-header">
        <span>👁️</span> Aperçu en direct
        <div className="export-buttons">
          <button
            onClick={exportAsSVG}
            className="export-btn"
            title="Exporter en SVG"
            disabled={isExporting}
          >
            📄 SVG
          </button>
          <button
            onClick={exportAsPNG}
            className="export-btn"
            title="Exporter en PNG"
            disabled={isExporting}
          >
            {isExporting ? "⏳" : "🖼️"} PNG
          </button>
          <button
            onClick={exportAsPDF}
            className="export-btn"
            title="Exporter en PDF"
            disabled={isExporting}
          >
            {isExporting ? "⏳" : "📋"} PDF
          </button>
        </div>
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
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderMobileTabs = () => (
    <>
      <div className="mobile-tabs">
        <button
          className={activeMobileTab === "editor" ? "active" : ""}
          onClick={() => handleTabChange("editor")}
        >
          📝 Éditeur
        </button>
        <button
          className={activeMobileTab === "preview" ? "active" : ""}
          onClick={() => handleTabChange("preview")}
        >
          👁️ Aperçu
        </button>
      </div>

      {activeMobileTab === "editor" && renderEditorView()}
      {activeMobileTab === "preview" && renderPreviewView()}
    </>
  );

  const renderDesktopView = () => (
    <>
      {renderEditorView()}

      <div className="resize-handle" onMouseDown={handleResizeStart}>
        <div className="resize-handle-bar"></div>
      </div>

      {renderPreviewView()}
    </>
  );

  return (
    <div className="editor-page">
      <div className="editor-header">
        <h1>✨ Éditeur WYSIWYG Avancé</h1>
        <p>
          Éditeur professionnel avec coloration syntaxique, auto-complétion et
          validation en temps réel
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
          <button onClick={() => loadTemplate("subgraph")}>
            🔲 Sous-graphes
          </button>
          <button onClick={() => loadTemplate("styled")}>
            🎨 Styles personnalisés
          </button>
          <button onClick={() => loadTemplate("interactive")}>
            🔗 Liens cliquables
          </button>
        </div>
      </div>

      <div className="editor-container" ref={containerRef}>
        {isMobile ? renderMobileTabs() : renderDesktopView()}
      </div>

      <div className="tips-section">
        <h3>💡 Fonctionnalités d'export améliorées</h3>
        <div className="tips-grid">
          <div className="tip">
            <h4>📄 SVG Vectoriel</h4>
            <p>
              Export haute qualité évolutif sans perte, parfait pour
              l'impression professionnelle.
            </p>
          </div>
          <div className="tip">
            <h4>🖼️ PNG Optimisé</h4>
            <p>
              Image haute résolution avec fond blanc et marges, idéale pour le
              web.
            </p>
          </div>
          <div className="tip">
            <h4>📋 PDF Professionnel</h4>
            <p>
              Document avec diagramme centré, ajusté automatiquement et
              parfaitement lisible.
            </p>
          </div>
          <div className="tip">
            <h4>🎯 Qualité Garantie</h4>
            <p>
              Tous les exports préservent la lisibilité même pour les grands
              diagrammes complexes.
            </p>
          </div>
        </div>
      </div>

      {isExporting && (
        <div className="export-overlay">
          <div className="export-spinner">
            <div className="spinner"></div>
            <p>Génération en cours...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MermaidEditor;
