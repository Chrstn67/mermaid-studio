export const mermaidData = [
  {
    id: 1,
    title: "Architecture Microservices - Application E-commerce",
    type: "graph",
    tags: ["architecture", "microservices", "ecommerce", "devops"],
    code: `graph TB
    subgraph Frontend
        A[Application React]
        B[Application Mobile]
        C[CDN - Assets Statiques]
    end
    
    subgraph API Gateway
        G[Gateway - NGINX]
        H[Load Balancer]
    end
    
    subgraph Microservices
        MS1[Service Utilisateurs]
        MS2[Service Produits]
        MS3[Service Commandes]
        MS4[Service Paiements]
        MS5[Service Notifications]
        MS6[Service Recherche]
    end
    
    subgraph Base de Données
        DB1[(MySQL - Users)]
        DB2[(MongoDB - Products)]
        DB3[(PostgreSQL - Orders)]
        DB4[(Redis - Cache)]
        DB5[(Elasticsearch - Search)]
    end
    
    subgraph Monitoring
        M1[Prometheus]
        M2[Grafana]
        M3[ELK Stack]
    end
    
    A --> H
    B --> H
    C --> H
    H --> G
    G --> MS1
    G --> MS2
    G --> MS3
    G --> MS4
    G --> MS5
    G --> MS6
    MS1 --> DB1
    MS2 --> DB2
    MS3 --> DB3
    MS4 --> DB4
    MS5 --> DB4
    MS6 --> DB5
    MS1 --> M1
    MS2 --> M1
    MS3 --> M1`,
  },
  {
    id: 2,
    title: "Séquence Authentification JWT",
    type: "sequenceDiagram",
    tags: ["auth", "sécurité", "jwt", "api"],
    code: `sequenceDiagram
    participant Client as Client Frontend
    participant Auth as Service Auth
    participant API as API Backend
    participant DB as Base de Données
    
    Client->>Auth: POST /login (email, password)
    Auth->>DB: Vérifier credentials
    DB-->>Auth: Données utilisateur
    Auth->>Auth: Générer JWT Token
    Auth-->>Client: JWT Token + Refresh Token
    
    Note over Client,Auth: Session authentifiée
    Client->>API: GET /profile (avec JWT)
    API->>API: Valider signature JWT
    API->>DB: Récupérer données profil
    DB-->>API: Données profil
    API-->>Client: Données utilisateur
    
    Note over Client,API: Token expiré
    Client->>Auth: POST /refresh (refresh_token)
    Auth->>Auth: Valider refresh token
    Auth-->>Client: Nouveau JWT Token
    
    Client->>API: DELETE /logout
    API->>DB: Invalider token
    API-->>Client: Déconnecté`,
  },
  {
    id: 3,
    title: "Modèle de Classes - Système de Blog",
    type: "classDiagram",
    tags: ["oop", "classes", "blog", "modélisation"],
    code: `classDiagram
    class Utilisateur {
        +int id
        +string username
        +string email
        +string password_hash
        +datetime created_at
        +bool is_active
        +s'inscrire()
        +se_connecter()
        +creer_article()
    }
    
    class Article {
        +int id
        +string titre
        +string contenu
        +string slug
        +bool est_publie
        +datetime created_at
        +datetime updated_at
        +publier()
        +depublier()
        +ajouter_tag()
    }
    
    class Commentaire {
        +int id
        +string contenu
        +datetime created_at
        +bool est_approuve
        +approuver()
        +supprimer()
    }
    
    class Categorie {
        +int id
        +string nom
        +string description
    }
    
    class Tag {
        +int id
        +string nom
    }
    
    Utilisateur "1" -- "*" Article : écrit
    Utilisateur "1" -- "*" Commentaire : poste
    Article "1" -- "*" Commentaire : contient
    Article "*" -- "*" Tag : a
    Article "1" -- "1" Categorie : appartient`,
  },
  {
    id: 4,
    title: "Workflow Déploiement CI/CD",
    type: "stateDiagram-v2",
    tags: ["devops", "ci-cd", "workflow", "déploiement"],
    code: `stateDiagram-v2
    [*] --> Développement
    Développement --> Intégration : Push sur feature/
    state Intégration {
        [*] --> Build
        Build --> TestUnitaires : Succès
        TestUnitaires --> TestIntégration : Succès
        TestIntégration --> AnalyseQualité : Succès
        Build --> [*] : Échec
        TestUnitaires --> [*] : Échec
        TestIntégration --> [*] : Échec
        AnalyseQualité --> [*] : Échec
    }
    Intégration --> Staging : Merge sur develop
    Staging --> TestsAcceptation : Déploiement réussi
    TestsAcceptation --> Production : Tests validés
    Production --> Monitoring : Déploiement live
    Monitoring --> [*] : Stable
    
    note right of Développement
        Développeurs travaillent
        sur les branches feature
    end note
    
    note right of Production
        Déploiement progressif
        Canary → 50% → 100%
    end note`,
  },
  {
    id: 5,
    title: "Modèle Entité-Relation - SaaS CRM",
    type: "erDiagram",
    tags: ["base de données", "erp", "crm", "entités"],
    code: `erDiagram
    CLIENT {
        int client_id PK
        string nom_entreprise
        string email_contact
        string telephone
        string adresse
        datetime date_creation
    }
    
    UTILISATEUR {
        int utilisateur_id PK
        int client_id FK
        string nom
        string prenom
        string email
        string role
        bool actif
    }
    
    PROJET {
        int projet_id PK
        int client_id FK
        string nom_projet
        string description
        decimal budget
        date date_debut
        date date_fin_prevue
        string statut
    }
    
    TACHE {
        int tache_id PK
        int projet_id FK
        int assigne_a FK
        string titre
        text description
        string priorite
        string statut
        int heures_estimees
    }
    
    FACTURE {
        int facture_id PK
        int client_id FK
        decimal montant_ht
        decimal tva
        decimal montant_ttc
        date date_emission
        date date_echeance
        string statut_paiement
    }
    
    CONTRAT {
        int contrat_id PK
        int client_id FK
        string type_contrat
        date date_debut
        date date_fin
        decimal montant_abonnement
    }
    
    CLIENT ||--o{ UTILISATEUR : possede
    CLIENT ||--o{ PROJET : a
    CLIENT ||--o{ FACTURE : recoit
    CLIENT ||--o{ CONTRAT : souscrit
    PROJET ||--o{ TACHE : contient
    UTILISATEUR ||--o{ TACHE : assignee`,
  },
  {
    id: 6,
    title: "Parcours Utilisateur - Achat en Ligne",
    type: "journey",
    tags: ["ux", "user journey", "ecommerce", "parcours"],
    code: `journey
    title Parcours d'achat en ligne
    
    section Navigation
      Visite page d'accueil: 5: Visiteur
      Recherche produit: 4: Visiteur
      Filtre résultats: 3: Visiteur
    
    section Décision
      Consulte fiche produit: 5: Prospect
      Lit avis clients: 4: Prospect
      Compare prix: 3: Prospect
    
    section Achat
      Ajoute au panier: 5: Acheteur
      Passe commande: 5: Acheteur
      Sélectionne livraison: 4: Acheteur
      Paiement sécurisé: 5: Acheteur
    
    section Post-Achat
      Recoit confirmation: 5: Client
      Suit livraison: 4: Client
      Donne avis: 3: Client
      Réachète: 4: Client Fidèle`,
  },
  {
    id: 7,
    title: "Planning Projet - Développement Application",
    type: "gantt",
    tags: ["gestion de projet", "planning", "timeline", "agile"],
    code: `gantt
    title Planning Développement Application Mobile
    dateFormat  YYYY-MM-DD
    axisFormat %d/%m
    
    section Conception
      Spécifications techniques :crit, 2024-01-01, 10d
      Maquettes UI/UX :2024-01-08, 12d
      Architecture backend :2024-01-15, 8d
    
    section Développement Frontend
      Setup projet React Native :2024-01-22, 3d
      Composants authentification :2024-01-25, 7d
      Interface principale :2024-02-01, 14d
      Intégration API :2024-02-12, 10d
    
    section Développement Backend
      API REST :2024-01-22, 15d
      Base de données :2024-02-05, 10d
      Microservices :2024-02-12, 12d
      Tests unitaires :2024-02-19, 8d
    
    section Tests & Déploiement
      Tests d'intégration :2024-02-26, 10d
      Correction bugs :2024-03-07, 7d
      Déploiement staging :2024-03-14, 3d
      Déploiement production :milestone, 2024-03-20, 1d`,
  },
  {
    id: 8,
    title: "Répartition des Technologies Backend",
    type: "pie",
    tags: ["statistiques", "technologies", "backend", "survey"],
    code: `pie title Parts de marché Technologies Backend 2024
    "Node.js" : 35
    "Python (Django/Flask)" : 25
    "Java (Spring)" : 15
    "C# (.NET)" : 12
    "PHP (Laravel)" : 8
    "Go" : 3
    "Autres" : 2`,
  },
  {
    id: 9,
    title: "Matrice d'Impact des Fonctionnalités",
    type: "quadrantChart",
    tags: ["product management", "priorisation", "matrice"],
    code: `quadrantChart
    title Matrice d'Impact vs Effort
    x-axis "Faible Effort" --> "Fort Effort"
    y-axis "Faible Impact" --> "Fort Impact"
    quadrant-1 "Prioriser"
    quadrant-2 "Planifier"
    quadrant-3 "Éliminer"
    quadrant-4 "Évaluer"
    "Authentification OAuth2": [0.2, 0.9]
    "Chat en temps réel": [0.8, 0.7]
    "Export PDF": [0.3, 0.4]
    "Thèmes personnalisables": [0.7, 0.3]
    "Recherche avancée": [0.5, 0.6]
    "Notifications push": [0.4, 0.8]
    "Mode hors-ligne": [0.9, 0.5]`,
  },
  {
    id: 10,
    title: "Exigences système - Plateforme SaaS",
    type: "requirementDiagram",
    tags: ["exigences", "spécifications", "système", "saas"],
    code: `requirementDiagram

    requirement SystèmeWeb {
        id: 1
        text: "Le système doit fournir une application web fonctionnelle."
        risk: Medium
        verifymethod: Test
    }

    requirement Frontend {
        id: 2
        text: "L'interface utilisateur doit être responsive et accessible."
        risk: Low
        verifymethod: Inspection
    }

    requirement Backend {
        id: 3
        text: "L'API doit gérer les requêtes HTTP et les opérations CRUD."
        risk: High
        verifymethod: Test
    }

    requirement Securite {
        id: 4
        text: "Le système doit implémenter l'authentification et la protection CSRF."
        risk: High
        verifymethod: Test
    }

    requirement Performance {
        id: 5
        text: "Les pages doivent charger en moins de 3 secondes."
        risk: Medium
        verifymethod: Test
    }

    requirement Compatibilite {
        id: 6
        text: "L'application doit être compatible avec les navigateurs modernes."
        risk: Low
        verifymethod: Test
    }

    element ApplicationECommerce {
        type: "Application"
    }

    element React {
        type: "Framework"
    }

    element NodeJS {
        type: "Runtime"
    }

    element BaseDeDonnees {
        type: "Database"
    }

    element HTTPS {
        type: "Protocol"
    }

    SystèmeWeb - contains -> Frontend
    SystèmeWeb - contains -> Backend
    SystèmeWeb - contains -> Securite
    SystèmeWeb - contains -> Performance
    SystèmeWeb - contains -> Compatibilite
    
    Frontend - copies -> React
    Backend - copies -> NodeJS
    Backend - contains -> BaseDeDonnees
    Securite - contains -> HTTPS`,
  },
  {
    id: 11,
    title: "Workflow Git - Modèle GitFlow",
    type: "gitGraph",
    tags: ["git", "workflow", "versioning", "collaboration"],
    code: `gitGraph
    commit id: "Initial commit"
    branch develop
    checkout develop
    commit id: "feat: ajout authentification de base"
    commit id: "fix: correction bug connexion"
    branch feature/user-profile
    commit id: "feat: page profil utilisateur"
    commit id: "feat: upload avatar"
    commit id: "test: tests unitaires profil"
    checkout develop
    merge feature/user-profile id: "Merge feature user profile"
    branch release/v1.2.0
    commit id: "chore: préparation release"
    commit id: "fix: derniers bugs"
    checkout main
    merge release/v1.2.0 id: "Release v1.2.0"
    checkout develop
    commit id: "feat: début refonte UI"
    branch hotfix/critical-security
    commit id: "fix: vulnérabilité sécurité critique"
    checkout main
    merge hotfix/critical-security id: "Hotfix sécurité"
    checkout develop
    merge hotfix/critical-security id: "Merge hotfix dans develop"`,
  },
  {
    id: 12,
    title: "Architecture Cloud AWS - Mind Map",
    type: "mindmap",
    tags: ["aws", "cloud", "architecture", "services"],
    code: `mindmap
    root((AWS Cloud))
      Compute
        EC2
          Instances
          Auto Scaling
        Lambda
          Functions
          Event Triggers
        ECS
          Containers
          Fargate
      Storage
        S3
          Buckets
          Versioning
        EBS
          Volumes
          Snapshots
        EFS
          File System
      Database
        RDS
          MySQL
          PostgreSQL
        DynamoDB
          NoSQL
          DAX
        ElastiCache
          Redis
          Memcached
      Networking
        VPC
          Subnets
          Security Groups
        CloudFront
          CDN
          Distributions
        Route 53
          DNS
          Routing
      Security
        IAM
          Users
          Roles
        Cognito
          Authentication
          User Pools
        KMS
          Encryption
          Key Management`,
  },
  {
    id: 13,
    title: "Évolution des Langages de Programmation",
    type: "timeline",
    tags: ["histoire", "programmation", "technologies", "évolution"],
    code: `timeline
    title Histoire des Langages de Programmation
    
    1950 : Langages bas niveau
      : Fortran
      : LISP
      : COBOL
    
    1970 : Révolution structured
      : C
      : Pascal
      : SQL
    
    1980 : Orienté objet
      : C++
      : Objective-C
      : Perl
    
    1990 : Internet & Scripting
      : Python
      : Ruby
      : JavaScript
      : Java
      : PHP
    
    2000 : Moderne & Fonctionnel
      : C#
      : Scala
      : Go
      : Rust
    
    2010 : Spécialisation
      : TypeScript
      : Swift
      : Kotlin
      : Dart`,
  },
  {
    id: 14,
    title: "Architecture en Blocs - Système de Monitoring",
    type: "block",
    tags: ["architecture", "blocs", "monitoring", "système"],
    code: `block-beta
columns 1

  db(("Base de Données"))
  blockArrowId6<["&nbsp;&nbsp;&nbsp;"]>(down)
  
  block:ArchitectureWeb
    Client["Client Navigateur"]
    Serveur["Serveur Web & API"]
    Frontend["Application Frontend"]
  end
  
  space
  
  Deployment["Déploiement & Hébergement"]
  
  ArchitectureWeb --> Deployment
  Frontend --> Deployment
  style Serveur fill:#969,stroke:#333,stroke-width:4px`,
  },
  {
    id: 15,
    title: "Workflow de Développement Agile",
    type: "stateDiagram-v2",
    tags: ["agile", "workflow", "scrum", "développement"],
    code: `stateDiagram-v2
    [*] --> ProductBacklog
    ProductBacklog --> SprintPlanning
    SprintPlanning --> SprintBacklog
    
    state SprintBacklog {
        [*] --> Development
        Development --> CodeReview
        CodeReview --> QA
        QA --> Done
        Development --> [*] : Blocked
        CodeReview --> [*] : Changes Needed
        QA --> [*] : Bugs Found
    }
    
    SprintBacklog --> DailyScrum : Each Day
    DailyScrum --> SprintBacklog : Continue
    SprintBacklog --> SprintReview : End of Sprint
    SprintReview --> SprintRetrospective
    SprintRetrospective --> ProductBacklog : Refinement
    ProductBacklog --> [*] : Project End
    
    note right of ProductBacklog
        User Stories priorisées
        par Product Owner
    end note
    
    note left of SprintBacklog
        Équipe développement
        travaille sur les tâches
    end note`,
  },
];

// Types de diagrammes disponibles pour le filtrage
export const diagramTypes = [
  "all",
  "graph",
  "sequenceDiagram",
  "classDiagram",
  "stateDiagram-v2",
  "erDiagram",
  "journey",
  "gantt",
  "pie",
  "quadrantChart",
  "requirementDiagram",
  "gitGraph",
  "mindmap",
  "timeline",
  "block",
];
