export const tutorialData = {
  all: {
    title: "Tous les diagrammes Mermaid",
    description:
      "Mermaid est un outil de création de diagrammes basé sur du texte. Choisissez le type de diagramme qui correspond à vos besoins.",
    syntax: [
      { label: "Déclaration", code: "```mermaid\ntypeDiagram\n```" },
      { label: "Orientation", code: "graph TD (Top-Down) ou LR (Left-Right)" },
      { label: "Commentaires", code: "%% Ceci est un commentaire" },
    ],
    example: `graph TD
    A[Diagramme de flux] --> B[Diagramme de séquence]
    A --> C[Diagramme de classes]
    A --> D[Diagramme Git]
    B --> E[Autres types]`,
  },
  graph: {
    title: "Créer un diagramme de flux",
    description:
      "Les diagrammes de flux permettent de visualiser des processus et des décisions. Parfait pour les algorithmes et les workflows.",
    syntax: [
      { label: "Nœud simple", code: "A[Texte du nœud]" },
      { label: "Nœud de décision", code: "B{Question?}" },
      { label: "Nœud arrondi", code: "C(Processus)" },
      { label: "Nœud circulaire", code: "D((Début/Fin))" },
      { label: "Connexion simple", code: "A --> B" },
      { label: "Connexion avec texte", code: "A -->|Oui| B" },
      { label: "Connexion pointillée", code: "A -.-> B" },
      { label: "Connexion épaisse", code: "A ==> B" },
    ],
    example: `graph TD
    A[Début] --> B{Condition vérifiée?}
    B -->|Oui| C[Action 1]
    B -->|Non| D[Action 2]
    C --> E[Processus]
    D --> E
    E --> F((Fin))`,
  },
  sequenceDiagram: {
    title: "Créer un diagramme de séquence",
    description:
      "Les diagrammes de séquence montrent les interactions entre différents acteurs dans l'ordre chronologique.",
    syntax: [
      { label: "Participant", code: "participant Nom" },
      { label: "Acteur", code: "actor Utilisateur" },
      { label: "Message synchrone", code: "A->B: Message" },
      { label: "Message asynchrone", code: "A->>B: Message" },
      { label: "Réponse", code: "B-->>A: Réponse" },
      { label: "Activation", code: "activate B" },
      { label: "Désactivation", code: "deactivate B" },
      { label: "Note", code: "Note right of A: Texte" },
      { label: "Boucle", code: "loop Chaque minute" },
    ],
    example: `sequenceDiagram
    participant U as Utilisateur
    participant S as Serveur
    participant DB as Base de données
    
    U->>S: Requête HTTP
    activate S
    S->>DB: Query SQL
    activate DB
    DB-->>S: Résultats
    deactivate DB
    S-->>U: Réponse JSON
    deactivate S`,
  },
  classDiagram: {
    title: "Créer un diagramme de classes",
    description:
      "Les diagrammes de classes modélisent la structure d'un système orienté objet avec ses classes, attributs et relations.",
    syntax: [
      { label: "Classe", code: "class NomClasse" },
      { label: "Attributs", code: "String nom" },
      { label: "Méthodes", code: "getNom() String" },
      { label: "Héritage", code: "Enfant --|> Parent" },
      { label: "Implémentation", code: "Classe ..|> Interface" },
      { label: "Association", code: "Classe1 --> Classe2" },
      { label: "Agrégation", code: "Classe1 o-- Classe2" },
      { label: "Composition", code: "Classe1 *-- Classe2" },
    ],
    example: `classDiagram
    class Personne {
        +String nom
        +int age
        +marcher()
    }
    
    class Employé {
        +double salaire
        +travailler()
    }
    
    class Manager {
        +List~Employé~ équipe
        +diriger()
    }
    
    Personne <|-- Employé
    Employé <|-- Manager
    Manager o-- Employé`,
  },
  stateDiagram: {
    title: "Créer un diagramme d'états",
    description:
      "Représente les différents états d'un système et les transitions entre eux. Idéal pour les machines à états.",
    syntax: [
      { label: "État initial", code: "[*] --> État1" },
      { label: "État simple", code: "état : État1" },
      { label: "État composé", code: "état ÉtatComposé { [*] --> SousÉtat }" },
      { label: "Transition", code: "État1 --> État2" },
      {
        label: "Transition avec événement",
        code: "État1 --> État2 : événement",
      },
      {
        label: "Transition avec condition",
        code: "État1 --> État2 : condition",
      },
      { label: "État final", code: "État2 --> [*]" },
    ],
    example: `stateDiagram-v2
    [*] --> Inactif
    Inactif --> Actif : démarrer
    Actif --> EnPause : pause
    Actif --> [*] : arrêter
    EnPause --> Actif : reprendre
    EnPause --> Inactif : arrêter
    
    state Actif {
        [*] --> EnCours
        EnCours --> Terminé : finir
        Terminé --> [*]
    }`,
  },
  erDiagram: {
    title: "Créer un diagramme entité-relation",
    description:
      "Modélise la structure d'une base de données avec les entités, attributs et relations entre tables.",
    syntax: [
      { label: "Relation 1-1", code: "A ||--|| B : relation" },
      { label: "Relation 1-N", code: "A ||--o{ B : relation" },
      { label: "Relation N-1", code: "A }o--|| B : relation" },
      { label: "Relation N-N", code: "A }o--o{ B : relation" },
      { label: "Entité avec attributs", code: "A { string nom PK int id }" },
      { label: "Clé primaire", code: "PK" },
      { label: "Clé étrangère", code: "FK" },
    ],
    example: `erDiagram
    USER ||--o{ POST : écrit
    USER ||--o{ COMMENTAIRE : poste
    POST ||--o{ COMMENTAIRE : contient
    
    USER {
        int id PK
        string nom
        string email
        date created_at
    }
    
    POST {
        int id PK
        string titre
        string contenu
        int user_id FK
    }
    
    COMMENTAIRE {
        int id PK
        string texte
        int user_id FK
        int post_id FK
    }`,
  },
  journey: {
    title: "Créer un diagramme de parcours utilisateur",
    description:
      "Visualise l'expérience utilisateur à travers différentes étapes et touchpoints.",
    syntax: [
      { label: "Section", code: "section SectionName" },
      { label: "Étape", code: "StepName: Score: NomUtilisateur" },
      { label: "Tâche", code: "Task text: Score: NomUtilisateur" },
    ],
    example: `journey
    title Parcours d'achat en ligne
    
    section Recherche
      Visite site: 5: Client
      Recherche produit: 4: Client
      Filtrage résultats: 3: Client
    
    section Achat
      Ajout au panier: 5: Client
      Paiement: 4: Client
      Confirmation: 5: Client
    
    section Livraison
      Suivi commande: 4: Client
      Réception: 5: Client
      Évaluation: 3: Client`,
  },
  gantt: {
    title: "Créer un diagramme de Gantt",
    description:
      "Planifiez et visualisez les plannings de projet avec des tâches, dates et dépendances.",
    syntax: [
      { label: "Section", code: "section SectionName" },
      { label: "Tâche", code: "TaskName : done, des1, 2023-01-01, 2023-01-05" },
      { label: "Tâche critique", code: "crit" },
      { label: "Tâche active", code: "active" },
      { label: "Tâche terminée", code: "done" },
      { label: "Dépendance", code: "after des1" },
    ],
    example: `gantt
    title Planning de projet
    dateFormat YYYY-MM-DD
    axisFormat %d/%m
    
    section Phase 1
    Analyse besoins :crit, des1, 2024-01-01, 7d
    Conception :des2, after des1, 5d
    
    section Phase 2
    Développement frontend :active, des3, after des2, 10d
    Développement backend :des4, after des2, 12d
    
    section Phase 3
    Tests :des5, after des3, 5d
    Déploiement :des6, after des5, 2d`,
  },
  pie: {
    title: "Créer un diagramme circulaire",
    description:
      "Affiche des proportions sous forme de parts de gâteau. Parfait pour les statistiques et répartitions.",
    syntax: [
      { label: "Titre", code: 'pie title "Mon titre"' },
      { label: "Donnée", code: '"Label" : valeur' },
      { label: "Afficher les données", code: "showData" },
    ],
    example: `pie title Répartition du budget 2024
    "Développement" : 45
    "Marketing" : 25
    "Infrastructure" : 15
    "Formation" : 10
    "Autres" : 5`,
  },
  quadrantChart: {
    title: "Créer un graphique en quadrant",
    description:
      "Classifiez des éléments dans une matrice 2x2 selon deux axes de critères.",
    syntax: [
      { label: "Titre quadrant", code: 'quadrantChart "Titre"' },
      { label: "Axe X", code: 'x-axis "Faible" --> "Fort"' },
      { label: "Axe Y", code: 'y-axis "Bas" --> "Haut"' },
      { label: "Point", code: "Point1: [0.5, 0.7]" },
    ],
    example: `quadrantChart
    title Matrice d'analyse produit
    x-axis "Faible valeur" --> "Forte valeur"
    y-axis "Faible effort" --> "Fort effort"
    "Quick wins": [0.8, 0.2]
    "Big bets": [0.8, 0.8]
    "Fill-ins": [0.2, 0.2]
    "Time sinks": [0.2, 0.8]`,
  },
  requirementDiagram: {
    title: "Créer un diagramme d'exigences",
    description:
      "Structurez et tracez les exigences système avec leurs relations et hiérarchies.",
    syntax: [
      { label: "Exigence", code: "requirement id { type: requirement }" },
      { label: "Dérivation", code: "REQ1 -^ REQ2" },
      { label: "Satisfaction", code: "REQ1 -^ COMP1" },
      { label: "Vérification", code: "REQ1 -^ TEST1" },
      { label: "Contient", code: "REQ1 *- REQ2" },
    ],
    example: `requirementDiagram

    requirement functional_req {
        id: FR1
        type: functional
        text: "Le système doit authentifier les utilisateurs"
    }
    
    requirement performance_req {
        id: PR1
        type: performance
        text: "Le temps de réponse doit être < 2s"
    }
    
    requirement security_req {
        id: SR1
        type: security
        text: "Les mots de passe doivent être chiffrés"
    }
    
    functional_req -^ performance_req
    functional_req -^ security_req`,
  },
  gitGraph: {
    title: "Créer un graphe Git",
    description:
      "Visualise l'historique et les branches d'un dépôt Git avec les commits, merges et tags.",
    syntax: [
      { label: "Commit", code: "commit" },
      { label: "Commit avec message", code: 'commit "Message"' },
      { label: "Créer branche", code: "branch nom" },
      { label: "Changer branche", code: "checkout nom" },
      { label: "Fusionner", code: "merge nom" },
      { label: "Commit avec ID", code: 'commit id: "abc123"' },
      { label: "Tag", code: 'tag "v1.0"' },
    ],
    example: `gitGraph
    commit id: "init"
    branch develop
    checkout develop
    commit id: "feat1"
    commit id: "feat2"
    checkout main
    commit id: "hotfix"
    checkout develop
    commit id: "feat3"
    checkout main
    merge develop
    tag "v1.0"`,
  },
  mindmap: {
    title: "Créer une carte mentale",
    description:
      "Organisez vos idées de manière hiérarchique autour d'un concept central.",
    syntax: [
      { label: "Racine", code: "root((Concept central))" },
      { label: "Nœud enfant", code: "enfant1" },
      { label: "Sous-nœud", code: "sousenfant" },
      { label: "Nœud avec forme", code: "enfant2[Rectangle]" },
      { label: "Nœud arrondi", code: "enfant3(Rond)" },
      { label: "Nœud losange", code: "enfant4{Décision}" },
    ],
    example: `mindmap
    root((Projet X))
      Fonctionnalités
        Authentification
          Login
          Register
          Logout
        Dashboard
          Statistiques
          Rapports
      Technologies
        Frontend
          React
          TypeScript
        Backend
          Node.js
          Express
      Équipe
        Développeurs
        Designers
        Product Owners`,
  },
  timeline: {
    title: "Créer une timeline",
    description:
      "Représentez des événements chronologiques avec des dates et périodes.",
    syntax: [
      { label: "Section", code: "section Période" },
      { label: "Événement", code: "Événement : 2024" },
      { label: "Période", code: "Période : 2024-2025" },
    ],
    example: `timeline
    title Histoire de l'informatique
    
    section Années 80
      1984 : Premier Macintosh
      1985 : Windows 1.0
      1989 : World Wide Web
    
    section Années 90
      1991 : Linux
      1995 : Java
      1998 : Google
    
    section Années 2000
      2001 : Wikipedia
      2004 : Facebook
      2007 : iPhone
    
    section Années 2010
      2010 : Instagram
      2016 : ChatGPT précurseurs`,
  },
  block: {
    title: "Créer un diagramme en blocs",
    description:
      "Représentez des architectures système avec des blocs et leurs relations.",
    syntax: [
      { label: "Bloc", code: "block_id[Label du bloc]" },
      { label: "Flèche simple", code: "block1 --> block2" },
      { label: "Flèche avec texte", code: "block1 -- Label --> block2" },
      { label: "Flèche pointillée", code: "block1 -.-> block2" },
    ],
    example: `block-beta
    columns 1
    db1[("Base de données")]
    
    block:backend
    columns 3
    b1[API Gateway]
    b2[Service Auth]
    b3[Service Data]
    
    block:frontend
    columns 1
    f1[Application Web]
    
    db1 --> b2
    db1 --> b3
    b1 --> b2
    b1 --> b3
    f1 --> b1
    b2 --> f1
    b3 --> f1`,
  },
};
