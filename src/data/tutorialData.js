export const tutorialData = {
  all: {
    title: "Tous les diagrammes Mermaid",
    description:
      "Mermaid est un outil puissant de création de diagrammes basé sur du texte. Il te permet de créer des diagrammes complexes simplement en écrivant du code. Choisis le type de diagramme qui correspond à tes besoins parmi les 15 types disponibles.",
    syntax: [
      {
        label: "Déclaration de base",
        code: "```mermaid\ntypeDiagram\ncontenu du diagramme\n```",
      },
      {
        label: "Orientation (flowchart)",
        code: "graph TD (Top-Down)\ngraph LR (Left-Right)\ngraph BT (Bottom-Top)\ngraph RL (Right-Left)",
      },
      {
        label: "Commentaires",
        code: "%% Ceci est un commentaire et ne sera pas affiché",
      },
      { label: "Titres", code: "title Mon titre de diagramme" },
      {
        label: "Thèmes",
        code: "%%{init: {'theme':'dark'}}%% (dark, forest, default, neutral)",
      },
    ],
    example: `graph TD
    A[Diagramme de flux] --> B[Diagramme de séquence]
    A --> C[Diagramme de classes]
    A --> D[Diagramme Git]
    B --> E[Diagramme d'états]
    B --> F[Diagramme ER]
    C --> G[Diagramme de parcours]
    D --> H[Diagramme de Gantt]
    E --> I[Plus de 15 types disponibles !]`,
  },
  graph: {
    title: "Créer un diagramme de flux (Flowchart)",
    description:
      "Les diagrammes de flux (ou flowcharts) te permettent de visualiser des processus, des décisions et des flux de travail. Ils sont parfaits pour représenter des algorithmes, des workflows métier, ou toute logique de décision. Tu peux orienter ton diagramme dans 4 directions différentes : de haut en bas (TD), de bas en haut (BT), de gauche à droite (LR), ou de droite à gauche (RL). Chaque nœud peut avoir une forme spécifique selon sa fonction dans le processus. Voici une explication détaillée de chaque élément de syntaxe :",

    syntax: [
      {
        label: "Nœud rectangulaire",
        description:
          "Utilisé pour représenter une étape standard ou une action dans le processus. C'est la forme par défaut si aucune autre n'est spécifiée.",
        code: "A[Texte du nœud] B[Un autre nœud avec du texte long]",
      },
      {
        label: "Nœud de décision (losange)",
        description:
          "Utilisé pour représenter une décision ou une condition. Généralement, ce nœud a deux ou plusieurs sorties, chacune correspondant à une réponse possible à la question posée.",
        code: "C{Question ou condition?} D{Est-ce valide?}",
      },
      {
        label: "Nœud arrondi",
        description:
          "Utilisé pour représenter un processus ou une action spécifique. La forme arrondie permet de le distinguer des nœuds rectangulaires standards.",
        code: "E(Processus ou action) F(Étape intermédiaire)",
      },
      {
        label: "Nœud circulaire",
        description:
          "Utilisé pour représenter le début ou la fin d'un processus. Peut aussi être utilisé pour mettre en avant un point important ou un événement clé.",
        code: "G((Début)) H((Fin)) I((Point important))",
      },
      {
        label: "Nœud asymétrique",
        description:
          "Utilisé pour représenter une action ou une étape spéciale qui sort du cadre standard. La forme asymétrique attire l'attention sur ce nœud.",
        code: "J>Action spéciale] K>Sortie]",
      },
      {
        label: "Nœud hexagonal",
        description:
          "Utilisé pour représenter une étape de préparation ou de configuration. La forme hexagonale est souvent utilisée pour des étapes techniques ou de paramétrage.",
        code: "L{{Préparation}} M{{Configuration}}",
      },
      {
        label: "Connexion simple",
        description:
          "Utilisée pour relier deux nœuds. La flèche pleine indique une relation directe ou un flux standard entre les nœuds. La ligne sans flèche est rarement utilisée, mais peut représenter une relation passive ou une dépendance.",
        code: "A --> B (flèche pleine) A --- B (ligne sans flèche)",
      },
      {
        label: "Connexion avec texte",
        description:
          "Utilisée pour relier deux nœuds tout en précisant la nature de la relation ou la condition. Le texte est affiché le long de la flèche.",
        code: "A -->|Oui| B A -->|Si vrai| C A --|Label| D",
      },
      {
        label: "Connexion pointillée",
        description:
          "Utilisée pour représenter une relation optionnelle, conditionnelle ou moins importante. Peut aussi indiquer une alternative ou un scénario secondaire.",
        code: "A -.-> B A -.->|Optionnel| C",
      },
      {
        label: "Connexion épaisse",
        description:
          "Utilisée pour représenter une relation forte ou importante. La flèche épaisse attire l'attention sur cette connexion.",
        code: "A ==> B A ==>|Important| C",
      },
      {
        label: "Chaînage",
        description:
          "Permet de relier plusieurs nœuds en séquence. Chaque nœud est connecté au suivant, formant une chaîne de processus ou d'étapes.",
        code: "A --> B --> C --> D (plusieurs connexions)",
      },
      {
        label: "Sous-graphes",
        description:
          "Permet de regrouper plusieurs nœuds dans un sous-graphe, souvent utilisé pour représenter un sous-processus ou une section spécifique du diagramme. Le titre du sous-graphe est affiché en haut du groupe.",
        code: "subgraph titre A --> B end",
      },
      {
        label: "Styles personnalisés",
        description:
          "Permet de personnaliser l'apparence des nœuds en définissant des styles spécifiques. 'fill' définit la couleur de remplissage, 'stroke' définit la couleur de la bordure. 'classDef' permet de définir une classe de style réutilisable pour plusieurs nœuds.",
        code: "style A fill:#f9f,stroke:#333 classDef className fill:#ff0",
      },
    ],

    example: `graph TD
    Start((Début)) --> Input[Saisir les données]
    Input --> Validate{Données valides?}
    Validate -->|Oui| Process[Traiter les données]
    Validate -->|Non| Error[Afficher erreur]
    Error --> Input
    Process --> Save{{Sauvegarder}}
    Save --> Check{Sauvegarde OK?}
    Check -->|Oui| Success[Confirmation]
    Check -->|Non| Retry>Réessayer]
    Retry --> Save
    Success --> End((Fin))

    style Start fill:#90EE90
    style End fill:#FFB6C1
    style Error fill:#FF6347
    style Success fill:#87CEEB`,
  },

  sequenceDiagram: {
    title: "Créer un diagramme de séquence",
    description:
      "Les diagrammes de séquence représentent les interactions entre différents acteurs ou composants dans l'ordre chronologique. Ils sont essentiels pour documenter des API, des protocoles de communication, ou des workflows d'application. Chaque flèche représente un message échangé avec son timing. Voici une explication détaillée de chaque élément de syntaxe :",

    syntax: [
      {
        label: "Déclaration participant",
        description:
          "Déclare un participant dans le diagramme. Le mot-clé 'participant' est suivi du nom du participant. Il est possible de donner un alias plus long avec 'as'.",
        code: "participant Nom participant A as Alias plus long",
      },
      {
        label: "Acteur (bonhomme)",
        description:
          "Déclare un acteur, généralement un utilisateur humain. La syntaxe est similaire à 'participant', mais utilise le mot-clé 'actor'.",
        code: "actor Utilisateur actor Admin as Administrateur",
      },
      {
        label: "Message synchrone",
        description:
          "Représente un message bloquant (->) ou asynchrone (->>) envoyé d'un participant à un autre. La flèche pleine indique un appel synchrone, tandis que la flèche avec une pointe ouverte indique un appel asynchrone.",
        code: "A->B: Message bloquant A->>B: Message asynchrone",
      },
      {
        label: "Ligne pointillée (retour)",
        description:
          "Représente une réponse ou un retour d'information. La ligne pointillée (-->>) est souvent utilisée pour les réponses asynchrones, tandis que la ligne pleine (->) est utilisée pour les retours synchrones.",
        code: "B-->>A: Réponse B-->A: Retour",
      },
      {
        label: "Flèche en X (destruction)",
        description:
          "Indique qu'un message entraîne la destruction ou la fin de vie d'un participant. La flèche se termine par une croix (x).",
        code: "A-xB: Message avec destruction A--xB: Retour avec destruction",
      },
      {
        label: "Activation (barre verticale)",
        description:
          "Active ou désactive un participant pour montrer son état actif ou inactif. 'activate' et 'deactivate' sont utilisés pour contrôler manuellement l'état. Les symboles '+' et '-' permettent d'activer ou désactiver automatiquement un participant lors de l'envoi ou de la réception d'un message.",
        code: "activate B deactivate B A->>+B: Active automatiquement B-->>-A: Désactive",
      },
      {
        label: "Notes",
        description:
          "Ajoute une note textuelle à côté d'un participant ou sur plusieurs participants. 'Note right of' et 'Note left of' placent la note à droite ou à gauche d'un participant. 'Note over' place la note au-dessus de plusieurs participants.",
        code: "Note right of A: Note à droite Note left of B: Note à gauche Note over A,B: Note sur plusieurs",
      },
      {
        label: "Boucles",
        description:
          "Définit une boucle pour représenter une action répétitive. Le bloc 'loop' contient les messages échangés pendant la boucle.",
        code: "loop Condition ou texte A->>B: Message end",
      },
      {
        label: "Alternatives",
        description:
          "Représente une structure conditionnelle avec plusieurs branches. 'alt' est utilisé pour définir les différentes conditions, suivies de 'else' pour les autres cas.",
        code: "alt Condition 1 A->>B: Action 1 else Condition 2 A->>C: Action 2 end",
      },
      {
        label: "Optionnel",
        description:
          "Représente un bloc de code qui ne s'exécute que si une condition est remplie. 'opt' est utilisé pour encapsuler le message optionnel.",
        code: "opt Si condition A->>B: Message optionnel end",
      },
      {
        label: "Parallèle",
        description:
          "Représente des actions qui se déroulent en parallèle. Chaque section est introduite par 'par' et séparée par 'and'.",
        code: "par Section 1 A->>B: Message 1 and Section 2 A->>C: Message 2 end",
      },
      {
        label: "Arrière-plan coloré",
        description:
          "Définit une zone de fond colorée pour regrouper visuellement des messages. 'rect rgb()' définit la couleur de fond en utilisant le code RGB.",
        code: "rect rgb(200, 220, 250) A->>B: Dans zone colorée end",
      },
      {
        label: "Numérotation auto",
        description:
          "Active la numérotation automatique des messages dans le diagramme. Chaque message est numéroté séquentiellement.",
        code: "autonumber",
      },
    ],

    example: `sequenceDiagram
    autonumber
    actor U as Utilisateur
    participant F as Frontend
    participant A as API Gateway
    participant S as Service Auth
    participant DB as Base de données
    U->>F: Charge l'application web
    activate F
    F->>F: Vérifie token JWT local
    alt Token valide présent
        F->>A: GET /api/profil
        activate A
        A->>S: Valider token JWT
        activate S
        S-->>A: Token valide
        deactivate S
        A->>DB: Requête données utilisateur
        activate DB
        DB-->>A: Données du profil
        deactivate DB
        A-->>F: 200 OK + données
        deactivate A
        F->>U: Affiche le tableau de bord
    else Token absent/invalide
        F->>U: Redirige vers page de connexion
        U->>F: Saisit email/mot de passe
        activate F
        F->>A: POST /auth/connexion
        activate A
        A->>S: Vérifier identifiants
        activate S
        S->>DB: Recherche utilisateur
        activate DB
        DB-->>S: Données cryptées
        deactivate DB
        S-->>A: Résultat authentification
        deactivate S
        alt Identifiants corrects
            A-->>F: 200 OK + nouveau token
            F->>F: Stocke token localStorage
            F->>U: Connexion réussie
        else Identifiants incorrects
            A-->>F: 401 Unauthorized
            F->>U: Erreur authentification
        end
        deactivate A
    end
    deactivate F
    Note over U,DB: Processus d'authentification complet`,
  },

  classDiagram: {
    title: "Créer un diagramme de classes UML",
    description:
      "Les diagrammes de classes sont au cœur de la modélisation orientée objet. Ils te permettent de représenter la structure statique d'un système avec ses classes, attributs, méthodes et relations. C'est l'outil idéal pour concevoir ton architecture avant de coder. Voici une explication détaillée de chaque élément de syntaxe :",

    syntax: [
      {
        label: "Déclaration classe",
        description:
          "Déclare une classe avec son nom. Les accolades permettent de définir les attributs et méthodes de la classe.",
        code: "class NomClasse class Personne { attributs méthodes }",
      },
      {
        label: "Visibilité attributs/méthodes",
        description:
          "Détermine la visibilité des attributs et méthodes : public (+), private (-), protected (#), ou package (~).",
        code: "+public -private #protected ~package",
      },
      {
        label: "Types d'attributs",
        description:
          "Déclare le type des attributs. Les types peuvent être primitifs (int, String, etc.) ou des collections (List, Map, etc.).",
        code: "+String nom -int age #List~String~ tags",
      },
      {
        label: "Méthodes",
        description:
          "Déclare les méthodes avec leur visibilité, leur nom, leurs paramètres et leur type de retour. Le symbole '$' indique une méthode statique, et '*' une méthode abstraite.",
        code: "+getNom() String +setAge(int) void #calculer()$ (statique)",
      },
      {
        label: "Attributs/méthodes statiques",
        description:
          "Indique qu'un attribut ou une méthode est statique avec le symbole '$'.",
        code: "getNom()$ String (avec $) +count$ int",
      },
      {
        label: "Attributs/méthodes abstraites",
        description:
          "Indique qu'une méthode est abstraite avec le symbole '*'.",
        code: "calculer()* void (avec *)",
      },
      {
        label: "Héritage (généralisation)",
        description:
          "Représente une relation d'héritage entre deux classes. La flèche creuse pointe vers la classe parente.",
        code: "Enfant --|> Parent (flèche creuse)",
      },
      {
        label: "Implémentation interface",
        description:
          "Représente une classe qui implémente une interface. Utilise une ligne pointillée avec une flèche creuse.",
        code: "Classe ..|> Interface (pointillé + flèche creuse)",
      },
      {
        label: "Association",
        description:
          "Représente une relation entre deux classes. Une flèche pleine indique une association unidirectionnelle, tandis qu'une ligne sans flèche indique une association bidirectionnelle.",
        code: "Classe1 --> Classe2 : utilise Classe1 -- Classe2 (bidirectionnel)",
      },
      {
        label: "Agrégation (a un)",
        description:
          "Représente une relation d'agrégation, où une classe contient une autre classe, mais la classe contenue peut exister indépendamment. Utilise un losange vide.",
        code: "Classe1 o-- Classe2 (losange vide) Voiture o-- Roue",
      },
      {
        label: "Composition (contient)",
        description:
          "Représente une relation de composition, où une classe contient une autre classe, et la classe contenue ne peut pas exister sans la classe conteneur. Utilise un losange plein.",
        code: "Classe1 *-- Classe2 (losange plein) Maison *-- Pièce",
      },
      {
        label: "Dépendance",
        description:
          "Représente une relation de dépendance, où une classe dépend d'une autre classe, mais de manière temporaire ou contextuelle. Utilise une ligne pointillée.",
        code: "Classe1 ..> Classe2 (pointillé)",
      },
      {
        label: "Cardinalités",
        description:
          "Indique le nombre d'instances d'une classe qui peuvent être associées à une instance d'une autre classe. Par exemple, '1' signifie une instance, '0..*' signifie zéro ou plusieurs instances.",
        code: 'Classe1 "1" --> "0..*" Classe2 Prof "1" --> "5..30" Étudiant',
      },
      {
        label: "Annotations/stéréotypes",
        description:
          "Ajoute des annotations ou des stéréotypes pour préciser le rôle ou la nature d'une classe. Par exemple, '<<interface>>' indique qu'une classe est une interface.",
        code: "<<interface>> <<abstract>> <<enumeration>>",
      },
      {
        label: "Notes",
        description:
          "Ajoute une note explicative pour une classe ou un groupe de classes.",
        code: 'note for Classe "Note explicative"',
      },
    ],

    example: `classDiagram
    %% Système de gestion e-commerce

    class Utilisateur {
        <<abstract>>
        #int id
        #String email
        #String motDePasse
        #Date dateInscription
        +seConnecter() bool
        +seDeconnecter() void
        +changerMotDePasse(String) bool
        +getInfos()* Utilisateur
    }

    class Client {
        -String adresse
        -String telephone
        -List~Commande~ historique
        +passerCommande(Panier) Commande
        +consulterHistorique() List~Commande~
        +ajouterAuPanier(Produit) void
        +getInfos() Client
    }

    class Admin {
        -String role
        -List~String~ permissions
        +ajouterProduit(Produit) void
        +modifierProduit(int, Produit) bool
        +supprimerProduit(int) bool
        +voirStatistiques() Stats
        +getInfos() Admin
    }

    class Produit {
        -int id
        -String nom
        -String description
        -double prix
        -int stock
        -Categorie categorie
        +getDetails() String
        +verifierDisponibilite() bool
        +mettreAJourStock(int) void
    }

    class Categorie {
        -int id
        -String nom
        -String description
        +ajouterProduit(Produit) void
    }

    class Panier {
        -List~LignePanier~ lignes
        -double total
        +ajouterProduit(Produit, int) void
        +retirerProduit(int) void
        +vider() void
        +calculerTotal() double
    }

    class LignePanier {
        -Produit produit
        -int quantite
        -double sousTotal
        +calculerSousTotal() double
    }

    class Commande {
        -int id
        -Date date
        -String statut
        -double montantTotal
        -Paiement paiement
        +confirmer() bool
        +annuler() bool
        +calculerTotal() double
    }

    class Paiement {
        -String methode
        -double montant
        -Date date
        -String statut
        +traiter() bool
        +rembourser() bool
    }

    %% Relations
    Utilisateur <|-- Client : hérite
    Utilisateur <|-- Admin : hérite

    Client "1" --> "0..1" Panier : possède
    Client "1" --> "0..*" Commande : passe

    Panier *-- "1..*" LignePanier : contient
    LignePanier --> "1" Produit : référence

    Commande "1" *-- "1" Paiement : inclut
    Commande "1" o-- "1..*" Produit : contient

    Produit "0..*" --> "1" Categorie : appartient à

    Admin ..> Produit : gère
    Admin ..> Commande : supervise

    note for Utilisateur "Classe abstraite parente\npour tous les types d'utilisateurs"
    note for Panier "Composition forte:\nles lignes n'existent pas\nsans le panier"`,
  },

  stateDiagram: {
    title: "Créer un diagramme d'états-transitions",
    description:
      "Les diagrammes d'états représentent le comportement dynamique d'un objet ou système à travers ses différents états et les événements qui déclenchent les transitions. Ils sont essentiels pour modéliser des machines à états, des workflows, ou des cycles de vie d'objets métier. Voici une explication détaillée de chaque élément de syntaxe :",

    syntax: [
      {
        label: "État initial",
        description:
          "Représente le point de départ du diagramme. Utilise [*] pour indiquer l'état initial.",
        code: "[*] --> État1",
      },
      {
        label: "État final",
        description:
          "Représente le point de fin du diagramme. Utilise [*] pour indiquer l'état final.",
        code: "État2 --> [*]",
      },
      {
        label: "État simple",
        description:
          "Déclare un état simple. Il est possible de donner un alias à un état avec 'as'.",
        code: 'state État1 state "État avec espaces" as e1',
      },
      {
        label: "Transition simple",
        description:
          "Représente une transition entre deux états sans événement spécifique.",
        code: "État1 --> État2",
      },
      {
        label: "Transition avec événement",
        description:
          "Représente une transition déclenchée par un événement. L'événement est indiqué après les deux-points (:).",
        code: "État1 --> État2 : événement / action",
      },
      {
        label: "Transition avec condition",
        description:
          "Représente une transition conditionnelle. La condition est indiquée entre crochets ([ ]).",
        code: "État1 --> État2 : [condition]",
      },
      {
        label: "Auto-transition",
        description:
          "Représente une transition d'un état vers lui-même, souvent utilisée pour indiquer un événement interne.",
        code: "État1 --> État1 : événement interne",
      },
      {
        label: "États composés",
        description:
          "Permet de regrouper plusieurs sous-états dans un état composé. Les sous-états sont définis entre accolades.",
        code: "state ÉtatComposé { [*] --> SousÉtat1 SousÉtat1 --> SousÉtat2 }",
      },
      {
        label: "États parallèles",
        description:
          "Permet de représenter des états qui évoluent en parallèle. Utilise 'fork' et 'join' pour indiquer le début et la fin des états parallèles.",
        code: "state fork <<fork>> state join <<join>> fork --> État1 fork --> État2",
      },
      {
        label: "Choix conditionnel",
        description:
          "Représente un point de décision avec plusieurs transitions conditionnelles. Utilise 'choice' pour indiquer le point de décision.",
        code: "state choix <<choice>> choix --> État1 : [x < 0] choix --> État2 : [x >= 0]",
      },
      {
        label: "Notes",
        description:
          "Ajoute une note explicative à côté d'un état ou d'une transition. Utilise 'note right of' ou 'note left of' pour positionner la note.",
        code: "note right of État1 : Note explicative note left of État2 Note multiligne end note",
      },
      {
        label: "Actions dans un état",
        description:
          "Déclare des actions spécifiques à exécuter lors de l'entrée, de la sortie ou pendant un état.",
        code: "state État1 { entrée / action sortie / action activité / action }",
      },
    ],

    example: `stateDiagram-v2
    %% Système de commande e-commerce

    [*] --> Panier : Créer panier

    state Panier {
        [*] --> Vide
        Vide --> NonVide : Ajouter article
        NonVide --> NonVide : Ajouter/Retirer article
        NonVide --> Vide : Vider panier
    }

    Panier --> ValidationCommande : Valider panier

    state ValidationCommande {
        [*] --> VerificationStock
        VerificationStock --> VerificationAdresse : Stock OK
        VerificationStock --> Annulation : Stock insuffisant
        VerificationAdresse --> ChoixLivraison : Adresse valide
        VerificationAdresse --> Annulation : Adresse invalide
        ChoixLivraison --> [*]
    }

    ValidationCommande --> Paiement : Validation OK
    ValidationCommande --> Panier : Retour panier

    state Paiement {
        [*] --> SaisieCB
        SaisieCB --> TraitementPaiement : Soumettre
        TraitementPaiement --> ValidationBanque

        state choix <<choice>>
        ValidationBanque --> choix
        choix --> Accepte : [Fonds suffisants]
        choix --> Refuse : [Fonds insuffisants]
        choix --> Timeout : [Pas de réponse]

        Refuse --> SaisieCB : Réessayer
        Timeout --> SaisieCB : Réessayer
        Accepte --> [*]
    }

    Paiement --> Confirmation : Paiement accepté
    Paiement --> Panier : Paiement refusé

    state Confirmation {
        [*] --> EnvoyerConfirmation
        EnvoyerConfirmation --> NotifierVendeur
        NotifierVendeur --> [*]
    }

    Confirmation --> TraitementCommande

    state TraitementCommande {
        [*] --> fork1
        state fork1 <<fork>>
        fork1 --> Preparation
        fork1 --> FacturationComptable

        Preparation --> PretPourExpedition
        FacturationComptable --> FactureGeneree

        state join1 <<join>>
        PretPourExpedition --> join1
        FactureGeneree --> join1
        join1 --> [*]
    }

    TraitementCommande --> Expedition

    state Expedition {
        [*] --> EnAttente
        EnAttente --> EnTransit : Remis au transporteur
        EnTransit --> EnLivraison : Arrivé en zone
        EnLivraison --> Livre : Livré
        EnLivraison --> TentativeLivraison : Absent
        TentativeLivraison --> EnLivraison : Nouvelle tentative
        TentativeLivraison --> Retour : 3 échecs
        Livre --> [*]
        Retour --> [*]
    }

    Expedition --> [*]
    Annulation --> [*]

    note right of Paiement
        Gestion des timeout
        et des erreurs de paiement
    end note

    note right of TraitementCommande
        Traitement parallèle de
        la préparation et facturation
    end note`,
  },

  erDiagram: {
    title: "Créer un diagramme entité-relation (ERD)",
    description:
      "Les diagrammes entité-relation modélisent la structure d'une base de données relationnelle. Ils montrent les entités (tables), leurs attributs (colonnes) et les relations entre elles avec leurs cardinalités. C'est l'outil indispensable pour concevoir ton schéma de base de données avant l'implémentation. Voici une explication détaillée de chaque élément de syntaxe :",

    syntax: [
      {
        label: "Relation un-à-un",
        description:
          "Représente une relation où une entité est associée à une seule autre entité, et vice versa.",
        code: "A ||--|| B : relation",
      },
      {
        label: "Relation un-à-plusieurs",
        description:
          "Représente une relation où une entité est associée à plusieurs autres entités. Le symbole 'o{' indique plusieurs entités optionnelles, tandis que '|{' indique plusieurs entités obligatoires.",
        code: "A ||--o{ B : relation A ||--|{ B (plusieurs obligatoires)",
      },
      {
        label: "Relation plusieurs-à-un",
        description:
          "Représente une relation où plusieurs entités sont associées à une seule autre entité.",
        code: "A }o--|| B : relation",
      },
      {
        label: "Relation plusieurs-à-plusieurs",
        description:
          "Représente une relation où plusieurs entités sont associées à plusieurs autres entités. Le symbole 'o{' indique plusieurs entités optionnelles, tandis que '|{' indique plusieurs entités obligatoires.",
        code: "A }o--o{ B : relation A }|--|{ B (obligatoire des 2 côtés)",
      },
      {
        label: "Relation optionnelle (o)",
        description:
          "Indique que la relation est optionnelle. Le symbole 'o' signifie zéro ou un/plusieurs, tandis que '|' signifie exactement un/plusieurs.",
        code: "o = zéro ou un/plusieurs | = exactement un/plusieurs",
      },
      {
        label: "Entité simple",
        description:
          "Déclare une entité avec ses attributs. Les attributs sont listés entre accolades.",
        code: "ENTITE { }",
      },
      {
        label: "Attributs avec types",
        description:
          "Déclare les attributs d'une entité avec leur type. Les types peuvent être primitifs (string, int, date, etc.) ou des objets complexes.",
        code: "string nom int age date created_at boolean actif",
      },
      {
        label: "Clé primaire",
        description:
          "Indique qu'un attribut est une clé primaire avec le suffixe 'PK'.",
        code: "int id PK string email PK",
      },
      {
        label: "Clé étrangère",
        description:
          "Indique qu'un attribut est une clé étrangère avec le suffixe 'FK'.",
        code: "int user_id FK int category_id FK",
      },
      {
        label: "Attribut unique",
        description:
          "Indique qu'un attribut doit avoir une valeur unique avec le suffixe 'UK'.",
        code: "string email UK",
      },
      {
        label: "Commentaire attribut",
        description:
          "Ajoute un commentaire à un attribut pour expliquer sa signification ou son usage.",
        code: 'string nom "Nom complet de l\'utilisateur"',
      },
      {
        label: "Plusieurs clés primaires",
        description:
          "Indique qu'une entité a plusieurs clés primaires, souvent utilisées dans les tables de jointure.",
        code: "int user_id PK,FK int post_id PK,FK",
      },
    ],

    example: `erDiagram
    %% Système de blog avec authentification

    USER ||--o{ POST : écrit
    USER ||--o{ COMMENT : poste
    USER ||--o{ LIKE : donne
    USER }o--o{ ROLE : possède
    USER ||--o{ SESSION : a

    POST ||--o{ COMMENT : contient
    POST ||--o{ LIKE : reçoit
    POST }o--|| CATEGORY : appartient_à
    POST }o--o{ TAG : est_taggé_par
    POST ||--o{ POST_REVISION : a_des_versions

    COMMENT ||--o{ COMMENT : répond_à
    COMMENT ||--o{ LIKE : reçoit

    USER {
        int id PK "Identifiant unique"
        string username UK "Nom d'utilisateur unique"
        string email UK "Email unique"
        string password_hash "Mot de passe hashé"
        string first_name "Prénom"
        string last_name "Nom"
        string avatar_url "URL de l'avatar"
        boolean is_active "Compte actif"
        boolean is_verified "Email vérifié"
        datetime created_at "Date de création"
        datetime updated_at "Date de modification"
        datetime last_login "Dernière connexion"
    }

    POST {
        int id PK
        string title "Titre du post"
        string slug UK "URL-friendly"
        text content "Contenu complet"
        string excerpt "Résumé court"
        string featured_image "Image principale"
        string status "draft, published, archived"
        int view_count "Nombre de vues"
        datetime published_at "Date de publication"
        datetime created_at
        datetime updated_at
        int author_id FK
        int category_id FK
    }

    COMMENT {
        int id PK
        text content
        boolean is_approved "Modération"
        datetime created_at
        datetime updated_at
        int user_id FK
        int post_id FK
        int parent_id FK "Pour les réponses"
    }

    CATEGORY {
        int id PK
        string name UK
        string slug UK
        text description
        int parent_id FK "Catégorie parente"
        int order "Ordre d'affichage"
        datetime created_at
    }

    TAG {
        int id PK
        string name UK
        string slug UK
        string color "Couleur d'affichage"
        datetime created_at
    }

    POST_TAG {
        int post_id PK,FK
        int tag_id PK,FK
        datetime created_at
    }

    LIKE {
        int id PK
        string likeable_type "POST, COMMENT"
        int likeable_id "ID de l'élément liké"
        int user_id FK
        datetime created_at
    }

    ROLE {
        int id PK
        string name UK "admin, editor, author, reader"
        text description
        json permissions "Liste des permissions"
        datetime created_at
    }

    USER_ROLE {
        int user_id PK,FK
        int role_id PK,FK
        datetime assigned_at
    }

    SESSION {
        int id PK
        string token UK "Token de session"
        string ip_address
        string user_agent
        datetime expires_at
        datetime created_at
        int user_id FK
    }

    POST_REVISION {
        int id PK
        text content "Contenu de cette version"
        string title "Titre de cette version"
        datetime created_at
        int post_id FK
        int author_id FK "Qui a fait la modif"
    }

    POST_TAG ||--|{ POST : "tagge"
    POST_TAG ||--|{ TAG : "est_taggué_par"

    USER_ROLE ||--|{ USER : "a"
    USER_ROLE ||--|{ ROLE : "assigné"

    CATEGORY ||--o{ CATEGORY : "sous_catégorie"`,
  },

  journey: {
    title: "Créer un diagramme de parcours utilisateur",
    description:
      "Les diagrammes de parcours (User Journey Maps) visualisent l'expérience utilisateur à travers différentes étapes, touchpoints et interactions avec ton produit ou service. Chaque étape est notée sur une échelle de satisfaction, ce qui te permet d'identifier les points de friction et les opportunités d'amélioration. Voici une explication détaillée de chaque élément de syntaxe :",

    syntax: [
      {
        label: "Titre",
        description:
          "Déclare le titre du parcours utilisateur. Ce titre apparaît en haut du diagramme.",
        code: "title Titre du parcours",
      },
      {
        label: "Section",
        description:
          "Déclare une section ou une phase du parcours. Chaque section regroupe plusieurs étapes.",
        code: "section Nom de la phase",
      },
      {
        label: "Étape avec score",
        description:
          "Déclare une étape du parcours avec un score de satisfaction et les acteurs impliqués. Le score est compris entre 1 et 5.",
        code: "Nom de l'étape : Score : Acteur1, Acteur2",
      },
      {
        label: "Scores",
        description:
          "Indique l'échelle de notation des étapes : 1 (très mauvais), 2 (mauvais), 3 (neutre), 4 (bon), 5 (excellent).",
        code: "1-5 (1=très mauvais, 3=neutre, 5=excellent)",
      },
      {
        label: "Plusieurs acteurs",
        description:
          "Permet d'indiquer plusieurs acteurs impliqués dans une étape, séparés par des virgules.",
        code: "Étape : 4 : Client, Support, Système",
      },
      {
        label: "Étape longue",
        description:
          "Permet de déclarer une étape avec un nom long, tout en conservant la structure de notation.",
        code: "Nom très long de l'étape : 3 : Acteur",
      },
    ],

    example: `journey
    title Parcours d'achat d'un smartphone en ligne

    section Découverte
      Voit publicité sur réseau social : 3 : Client
      Clique sur l'annonce : 4 : Client
      Arrive sur le site : 2 : Client, Système
      Navigue dans le catalogue : 3 : Client

    section Recherche et comparaison
      Utilise les filtres : 4 : Client
      Consulte les fiches produits : 5 : Client
      Lit les avis clients : 5 : Client
      Compare avec la concurrence : 2 : Client
      Revient sur le site : 3 : Client
      Pose question au chatbot : 4 : Client, Support

    section Décision
      Ajoute au panier : 5 : Client
      Voit frais de port : 2 : Client
      Cherche code promo : 3 : Client
      Applique réduction : 5 : Client
      Crée un compte : 3 : Client, Système

    section Paiement
      Renseigne adresse : 3 : Client
      Choisit mode de livraison : 4 : Client
      Entre coordonnées bancaires : 2 : Client, Système
      Validation 3D Secure : 3 : Client, Banque
      Reçoit confirmation : 5 : Client, Système

    section Livraison
      Reçoit email de suivi : 5 : Client, Système
      Suit le colis en ligne : 4 : Client, Transporteur
      Colis en retard : 1 : Client, Transporteur
      Contacte le support : 3 : Client, Support
      Reçoit compensation : 4 : Client, Support
      Réceptionne le colis : 4 : Client, Transporteur

    section Après-vente
      Déballage : 5 : Client
      Première utilisation : 5 : Client
      Activation garantie : 4 : Client, Système
      Laisse un avis positif : 5 : Client
      Recommande à un ami : 5 : Client
      S'inscrit à la newsletter : 3 : Client`,
  },

  gantt: {
    title: "Créer un diagramme de Gantt",
    description:
      "Les diagrammes de Gantt sont l'outil de référence pour la planification et le suivi de projets. Ils visualisent les tâches sur un calendrier, montrent leurs dépendances, leur durée, et leur état d'avancement. Parfait pour gérer des projets complexes avec de multiples équipes et jalons. Voici une explication détaillée de chaque élément de syntaxe :",

    syntax: [
      {
        label: "Titre",
        description:
          "Déclare le titre du projet. Ce titre apparaît en haut du diagramme.",
        code: "title Titre du projet",
      },
      {
        label: "Format de date",
        description:
          "Déclare le format des dates utilisées dans le diagramme. Par exemple, 'YYYY-MM-DD' ou 'DD/MM/YYYY'.",
        code: "dateFormat YYYY-MM-DD (ou DD/MM/YYYY)",
      },
      {
        label: "Format axe",
        description:
          "Déclare le format d'affichage des dates sur l'axe du diagramme. Par exemple, '%d/%m' ou '%d %b %Y'.",
        code: "axisFormat %d/%m (ou %d %b %Y)",
      },
      {
        label: "Section",
        description:
          "Déclare une section ou une phase du projet. Chaque section regroupe plusieurs tâches.",
        code: "section Nom de la phase",
      },
      {
        label: "Tâche terminée",
        description:
          "Déclare une tâche déjà terminée. Le mot-clé ':done' indique que la tâche est achevée.",
        code: "Nom tâche :done, id, 2024-01-01, 5d",
      },
      {
        label: "Tâche active",
        description:
          "Déclare une tâche en cours. Le mot-clé ':active' indique que la tâche est actuellement en cours.",
        code: "Nom tâche :active, id, 2024-01-06, 3d",
      },
      {
        label: "Tâche future",
        description:
          "Déclare une tâche à venir. La tâche est planifiée mais n'a pas encore commencé.",
        code: "Nom tâche :id, 2024-01-09, 2d",
      },
      {
        label: "Tâche critique",
        description:
          "Déclare une tâche critique pour le projet. Le mot-clé ':crit' met en évidence son importance.",
        code: "Nom tâche :crit, id, 2024-01-01, 5d",
      },
      {
        label: "Jalons (milestone)",
        description:
          "Déclare un jalon, une étape clé du projet. La durée est généralement de 0 jour.",
        code: "Nom jalon :milestone, id, 2024-01-15, 0d",
      },
      {
        label: "Dépendances",
        description:
          "Indique qu'une tâche dépend d'une autre tâche. La tâche dépendante ne peut commencer que lorsque la tâche précédente est terminée.",
        code: "Tâche B :id2, after id1, 3d",
      },
      {
        label: "Dates exactes",
        description:
          "Déclare une tâche avec une date de début et une date de fin précises.",
        code: "Tâche :id, 2024-01-01, 2024-01-05",
      },
      {
        label: "Durée en jours",
        description:
          "Indique la durée d'une tâche en jours (d), semaines (w), ou mois (m).",
        code: "5d (jours), 2w (semaines), 1m (mois)",
      },
      {
        label: "Exclure weekends",
        description:
          "Indique que les week-ends ne sont pas comptés dans la durée des tâches. Cette option n'est pas supportée par tous les outils de rendu.",
        code: "excludes weekends (non supporté dans tous les renderers)",
      },
      {
        label: "Aujourd'hui",
        description:
          "Affiche ou masque un marqueur pour la date du jour dans le diagramme.",
        code: "todayMarker on/off",
      },
    ],

    example: `gantt
    title Développement Application Mobile E-Commerce
    dateFormat  YYYY-MM-DD
    axisFormat %d/%m
    todayMarker on
    section Phase 1 - Initialisation
    Kickoff projet           :milestone, m1, 2024-01-01, 0d
    Analyse des besoins      :crit, done, a1, 2024-01-01, 7d
    Rédaction cahier charges :crit, done, a2, after a1, 5d
    Validation client        :milestone, done, m2, after a2, 0d
    section Phase 2 - Conception
    Architecture technique   :crit, done, c1, after m2, 5d
    Design UI/UX             :done, c2, after m2, 10d
    Maquettes screens        :done, c3, after c2, 7d
    Validation design        :milestone, done, m3, after c3, 0d
    Choix techno stack       :crit, done, c4, after c1, 3d
    Setup environnements     :done, c5, after c4, 3d
    section Phase 3 - Développement Backend
    API Authentication       :crit, active, d1, after c5, 10d
    API Produits             :active, d2, after d1, 8d
    API Panier & Commandes   :d3, after d2, 10d
    API Paiement Stripe      :crit, d4, after d3, 7d
    Tests unitaires Backend  :d5, after d1, 15d
    section Phase 4 - Développement Frontend
    Setup React Native       :crit, done, f1, after c5, 3d
    Écrans authentification  :active, f2, after f1, 8d
    Écrans catalogue         :f3, after f2, 10d
    Écrans panier            :f4, after f3, 7d
    Écrans paiement          :crit, f5, after f4, 8d
    Écrans profil            :f6, after f5, 5d
    section Phase 5 - Intégration
    Intégration API          :crit, i1, after f6, 5d
    Tests d'intégration      :i2, after i1, 7d
    Optimisation perfs       :i3, after i2, 5d
    section Phase 6 - Tests & QA
    Tests fonctionnels       :crit, t1, after i3, 7d
    Tests utilisateurs       :t2, after t1, 5d
    Corrections bugs         :t3, after t2, 10d
    Tests de charge          :t4, after t3, 3d
    UAT (User Acceptance)    :milestone, m4, after t4, 0d
    section Phase 7 - Déploiement
    Préparation stores       :dep1, after m4, 5d
    Déploiement staging      :crit, dep2, after dep1, 2d
    Tests pre-prod           :dep3, after dep2, 3d
    Déploiement production   :crit, milestone, dep4, after dep3, 1d
    Monitoring J+7           :dep5, after dep4, 7d
    section Phase 8 - Post-lancement
    Support utilisateurs     :sup1, after dep4, 30d
    Corrections hotfix       :sup2, after dep4, 30d
    Récolte feedback         :sup3, after dep4, 14d
    Planning v2              :milestone, after sup3, 0d`,
  },

  pie: {
    title: "Créer un diagramme circulaire (Pie Chart)",
    description:
      "Les diagrammes circulaires (ou camemberts) sont parfaits pour visualiser des proportions et des répartitions en pourcentage. Chaque part représente une portion du total, ce qui permet de comparer facilement les différentes catégories. Idéal pour les budgets, statistiques, ou toute donnée exprimée en parts. Voici une explication détaillée de chaque élément de syntaxe :",

    syntax: [
      {
        label: "Titre",
        description:
          "Déclare le titre du diagramme circulaire. Ce titre apparaît en haut du diagramme.",
        code: 'pie title "Titre du graphique"',
      },
      {
        label: "Donnée simple",
        description:
          "Déclare une donnée avec son label et sa valeur. Chaque ligne représente une part du diagramme.",
        code: "label : valeur",
      },
      {
        label: "Plusieurs données",
        description:
          "Déclare plusieurs données, chacune avec son label et sa valeur. Chaque ligne représente une part du diagramme.",
        code: '"Cat1" : 30 "Cat2" : 50 "Cat3" : 20',
      },
      {
        label: "Afficher valeurs",
        description: "Affiche les valeurs numériques sur le diagramme.",
        code: "showData",
      },
      {
        label: "Labels longs",
        description: "Permet d'utiliser des labels longs pour chaque donnée.",
        code: '"Label avec texte très long" : valeur',
      },
    ],

    example: `pie
    title Répartition du budget marketing 2024
    "Publicité digitale (Google, Meta)" : 35
    "Influenceurs et partenariats" : 20
    "Événements et salons" : 15
    "Content marketing (blog, vidéos)" : 12
    "Email marketing et automation" : 8
    "SEO et outils d'analyse" : 6
    "Relations presse" : 4`,
  },

  quadrantChart: {
    title: "Créer un graphique en quadrant",
    description:
      "Les graphiques en quadrant (ou matrices 2×2) te permettent de positionner des éléments selon deux axes de critères pour les classifier en 4 catégories. C'est un outil stratégique puissant pour prioriser des tâches (matrice Eisenhower), analyser des produits (BCG Matrix), ou évaluer des projets selon valeur/effort. Voici une explication détaillée de chaque élément de syntaxe :",

    syntax: [
      {
        label: "Titre",
        description:
          "Déclare le titre du graphique en quadrant. Ce titre apparaît en haut du diagramme.",
        code: 'quadrantChart\n  title "Titre"',
      },
      {
        label: "Axe X",
        description:
          "Déclare les labels des extrémités de l'axe X, de gauche à droite.",
        code: 'x-axis "Label gauche" --> "Label droite"',
      },
      {
        label: "Axe Y",
        description:
          "Déclare les labels des extrémités de l'axe Y, de bas en haut.",
        code: 'y-axis "Label bas" --> "Label haut"',
      },
      {
        label: "Point",
        description:
          "Déclare un point dans le graphique avec son nom et ses coordonnées (x, y). Les coordonnées sont comprises entre 0.0 et 1.0.",
        code: '"Nom point": [x, y]',
      },
      {
        label: "Coordonnées",
        description:
          "Les coordonnées x et y doivent être comprises entre 0.0 et 1.0 pour positionner le point dans le quadrant.",
        code: "x et y entre 0.0 et 1.0",
      },
      {
        label: "Quadrants",
        description:
          "Les quadrants sont automatiquement divisés en 4 zones égales par les axes X et Y.",
        code: "Automatiques (4 zones égales)",
      },
      {
        label: "Labels quadrants",
        description:
          "Déclare les labels des 4 quadrants pour les identifier clairement.",
        code: "quadrant-1 label\nquadrant-2 label\nquadrant-3 label\nquadrant-4 label",
      },
    ],

    example: `quadrantChart
    title Matrice de priorisation des fonctionnalités
    x-axis "Faible valeur business" --> "Forte valeur business"
    y-axis "Faible effort" --> "Fort effort"
    quadrant-1 "À FAIRE (Quick Wins)"
    quadrant-2 "STRATÉGIQUE (Big Bets)"
    quadrant-3 "MAYBE (Fill-ins)"
    quadrant-4 "ÉVITER (Time Sinks)"

    %% Quadrant 1 - Quick Wins (forte valeur, faible effort)
    "Améliorer UX checkout": [0.85, 0.25]
    "Ajouter filtres recherche": [0.80, 0.30]
    "Dark mode": [0.75, 0.20]
    "Notifications push": [0.82, 0.28]

    %% Quadrant 2 - Big Bets (forte valeur, fort effort)
    "App mobile native": [0.90, 0.85]
    "IA recommandations": [0.88, 0.80]
    "Programme fidélité": [0.85, 0.75]
    "Marketplace tiers": [0.92, 0.90]

    %% Quadrant 3 - Fill-ins (faible valeur, faible effort)
    "Widget météo": [0.15, 0.20]
    "Easter eggs": [0.10, 0.15]
    "Changement couleurs": [0.20, 0.25]
    "Animations supplémentaires": [0.18, 0.22]

    %% Quadrant 4 - Time Sinks (faible valeur, fort effort)
    "Refonte complète UI": [0.25, 0.85]
    "Chat vidéo intégré": [0.20, 0.80]
    "Jeu intégré": [0.10, 0.75]
    "Réseau social interne": [0.15, 0.88]`,
  },

  requirementDiagram: {
    title: "Créer un diagramme d'exigences",
    description:
      "Les diagrammes d'exigences structurent et tracent les besoins d'un système selon la méthode SysML. Ils montrent les exigences fonctionnelles, non-fonctionnelles, de performance, de sécurité, et leurs relations (dérivation, satisfaction, vérification, raffinement). Essentiel pour l'ingénierie système et la traçabilité. Voici une explication détaillée de chaque élément de syntaxe :",

    syntax: [
      {
        label: "Exigence",
        description:
          "Déclare une exigence avec son identifiant, sa description, son niveau de risque et sa méthode de vérification.",
        code: "requirement nom {\n  id: FR1\n  text: description\n  risk: High/Medium/Low\n  verifymethod: Test/Inspection/Analysis\n}",
      },
      {
        label: "Types",
        description:
          "Déclare le type d'une exigence : fonctionnelle, de performance, d'interface, physique, ou contrainte de conception.",
        code: "requirement (fonctionnel) functionalRequirement performanceRequirement interfaceRequirement physicalRequirement designConstraint",
      },
      {
        label: "Élément",
        description:
          "Déclare un élément du système (composant, service, test, etc.) avec son type et une référence documentaire.",
        code: "element nom {\n  type: composant\n  docref: URL\n}",
      },
      {
        label: "Dérivation",
        description: "Indique qu'une exigence en dérive une autre.",
        code: "REQ1 - derives -> REQ2",
      },
      {
        label: "Satisfaction",
        description: "Indique qu'un élément satisfait une exigence.",
        code: "REQ1 - satisfies -> ELEMENT",
      },
      {
        label: "Vérification",
        description: "Indique qu'un test ou un élément vérifie une exigence.",
        code: "REQ1 - verifies -> TEST",
      },
      {
        label: "Raffinement",
        description: "Indique qu'une exigence raffine une autre exigence.",
        code: "REQ1 - refines -> REQ2",
      },
      {
        label: "Traçabilité",
        description:
          "Indique une relation de traçabilité entre deux exigences.",
        code: "REQ1 - traces -> REQ2",
      },
      {
        label: "Contient",
        description: "Indique qu'une exigence en contient une autre.",
        code: "REQ1 - contains -> REQ2",
      },
    ],

    example: `requirementDiagram
    requirement system_req {
        id: "SYS-001"
        text: "Le système de e-commerce doit permettre les achats en ligne"
        risk: High
        verifymethod: Test
    }

    functionalRequirement auth_req {
        id: "FR-001"
        text: "Le système doit authentifier les utilisateurs"
        risk: High
        verifymethod: Test
    }

    functionalRequirement login_req {
        id: "FR-002"
        text: "Les utilisateurs doivent pouvoir se connecter avec email/password"
        risk: Medium
        verifymethod: Test
    }

    functionalRequirement oauth_req {
        id: "FR-003"
        text: "Support de l'authentification OAuth (Google, Facebook)"
        risk: Medium
        verifymethod: Test
    }

    functionalRequirement cart_req {
        id: "FR-010"
        text: "Les utilisateurs doivent pouvoir gérer un panier"
        risk: High
        verifymethod: Test
    }

    performanceRequirement response_req {
        id: "PF-001"
        text: "Le temps de réponse doit être inférieur à 2 secondes"
        risk: High
        verifymethod: Analysis
    }

    performanceRequirement concurrent_req {
        id: "PF-002"
        text: "Support de 10000 utilisateurs simultanés"
        risk: High
        verifymethod: Test
    }

    interfaceRequirement api_req {
        id: "IF-001"
        text: "Exposition d'une API REST JSON"
        risk: Medium
        verifymethod: Inspection
    }

    designConstraint security_req {
        id: "DC-001"
        text: "Tous les mots de passe doivent être hashés avec bcrypt"
        risk: High
        verifymethod: Inspection
    }

    designConstraint https_req {
        id: "DC-002"
        text: "Toutes les communications doivent utiliser HTTPS"
        risk: High
        verifymethod: Inspection
    }
    designConstraint gdpr_req {
        id: "DC-003"
        text: "Conformité RGPD pour les données utilisateurs"
        risk: High
        verifymethod: Analysis
    }
    element auth_service {
    type: service
    }
    element cart_service {
    type: service
    }
    element integration_tests {
    type: simulation
    }
    element load_tests {
    type: simulation
    }
    %% Relations hiérarchiques
    system_req - contains -> auth_req
    system_req - contains -> cart_req
    auth_req - contains -> login_req
    auth_req - contains -> oauth_req

    %% Dérivations
    auth_req - derives -> security_req
    auth_req - derives -> https_req
    system_req - derives -> response_req
    system_req - derives -> concurrent_req

    %% Satisfaction par composants
    auth_service - satisfies -> auth_req
    auth_service - satisfies -> login_req
    auth_service - satisfies -> oauth_req
    cart_service - satisfies -> cart_req

    %% Vérification par tests
    integration_tests - verifies -> auth_req
    integration_tests - verifies -> cart_req
    load_tests - verifies -> response_req
    load_tests - verifies -> concurrent_req

    %% Raffinements
    login_req - refines -> auth_req
    oauth_req - refines -> auth_req

    %% Contraintes liées
    security_req - traces -> gdpr_req
    https_req - traces -> security_req`,
  },

  gitGraph: {
    title: "Créer un graphe Git",
    description:
      "Les graphes Git visualisent l'historique et la structure des branches d'un dépôt Git. Ils montrent les commits, les merges, les branches parallèles, et les tags de version. C'est un excellent outil pédagogique pour comprendre Git ou pour documenter ta stratégie de branching (Git Flow, GitHub Flow, etc.). Voici une explication détaillée de chaque élément de syntaxe :",

    syntax: [
      {
        label: "Commit simple",
        description: "Ajoute un commit sans message ni identifiant spécifique.",
        code: "commit",
      },
      {
        label: "Commit avec message",
        description: "Ajoute un commit avec un message descriptif.",
        code: 'commit "Message du commit"',
      },
      {
        label: "Commit avec ID",
        description: "Ajoute un commit avec un identifiant unique.",
        code: 'commit id: "abc1234"',
      },
      {
        label: "Commit avec tag",
        description: "Ajoute un commit avec un tag de version.",
        code: 'commit tag: "v1.0.0"',
      },
      {
        label: "Commit complet",
        description:
          "Ajoute un commit avec un identifiant, un tag, et un type spécifique (HIGHLIGHT, REVERSE, etc.).",
        code: 'commit id: "abc" tag: "v1.0" type: HIGHLIGHT',
      },
      {
        label: "Créer branche",
        description:
          "Crée une nouvelle branche à partir de la branche actuelle.",
        code: "branch nom-branche",
      },
      {
        label: "Changer de branche",
        description: "Change la branche courante pour travailler dessus.",
        code: "checkout nom-branche",
      },
      {
        label: "Fusionner (merge)",
        description: "Fusionne une branche dans la branche courante.",
        code: "merge nom-branche",
      },
      {
        label: "Cherry-pick",
        description:
          "Applique un commit spécifique d'une autre branche à la branche courante.",
        code: 'cherry-pick id: "abc1234"',
      },
      {
        label: "Types de commit",
        description:
          "Détermine le type de commit : NORMAL (par défaut), REVERSE (inverse), HIGHLIGHT (mis en évidence).",
        code: "NORMAL, REVERSE, HIGHLIGHT",
      },
      {
        label: "Orientation",
        description:
          "Configure les options globales du graphe Git, comme le nom de la branche principale.",
        code: "%%{init: {'gitGraph': {'mainBranchName': 'main'}}}%%",
      },
    ],

    example: `%%{init: {'gitGraph': {'mainBranchName': 'main', 'showBranches': true, 'showCommitLabel': true}}}%%
gitGraph
    commit id: "init" tag: "v0.1"
    commit id: "setup" type: HIGHLIGHT

    branch develop
    checkout develop
    commit id: "feat: structure"
    commit id: "feat: auth base"

    branch feature/login
    checkout feature/login
    commit id: "feat: login UI"
    commit id: "feat: login API"
    commit id: "test: login tests"

    checkout develop
    merge feature/login tag: "feat-login-done"

    branch feature/dashboard
    checkout feature/dashboard
    commit id: "feat: dashboard UI"
    commit id: "feat: widgets"

    checkout develop
    commit id: "fix: auth bug"

    checkout feature/dashboard
    commit id: "feat: charts"
    merge develop
    commit id: "test: dashboard tests"

    checkout develop
    merge feature/dashboard

    branch feature/api
    checkout feature/api
    commit id: "feat: REST API"
    commit id: "feat: endpoints"

    checkout main
    commit id: "hotfix: security" type: REVERSE
    commit id: "hotfix: deploy" tag: "v0.2"

    checkout develop
    merge main

    checkout feature/api
    merge develop
    commit id: "feat: API docs"
    commit id: "test: API tests"

    checkout develop
    merge feature/api
    commit id: "chore: cleanup"
    commit id: "docs: update README"

    checkout main
    merge develop tag: "v1.0.0" type: HIGHLIGHT

    checkout develop
    branch release/v1.1
    checkout release/v1.1
    commit id: "chore: version bump"
    commit id: "fix: last bugs"

    checkout main
    merge release/v1.1 tag: "v1.1.0"

    checkout develop
    merge release/v1.1`,
  },

  mindmap: {
    title: "Créer une carte mentale (Mind Map)",
    description:
      "Les cartes mentales organisent tes idées de manière hiérarchique et visuelle autour d'un concept central. Elles stimulent la créativité, facilitent le brainstorming, et aident à structurer des projets complexes. Chaque branche peut avoir plusieurs niveaux pour décomposer les concepts en sous-éléments. Voici une explication détaillée de chaque élément de syntaxe :",

    syntax: [
      {
        label: "Racine (centre)",
        description:
          "Déclare le concept central de la carte mentale. C'est le point de départ de toutes les branches.",
        code: "mindmap\n  root((Concept central))",
      },
      {
        label: "Enfant niveau 1",
        description:
          "Ajoute un enfant de niveau 1, directement relié à la racine.",
        code: "  Enfant1\n  Enfant2",
      },
      {
        label: "Enfant niveau 2",
        description:
          "Ajoute un enfant de niveau 2, relié à un enfant de niveau 1.",
        code: "    SousEnfant1\n    SousEnfant2",
      },
      {
        label: "Enfant niveau 3+",
        description:
          "Ajoute un enfant de niveau 3 ou plus, en utilisant une indentation supplémentaire.",
        code: "      SousSousEnfant (indentation)",
      },
      {
        label: "Forme rectangle",
        description: "Déclare un nœud avec une forme rectangulaire.",
        code: "  Enfant[Rectangle]",
      },
      {
        label: "Forme arrondie",
        description: "Déclare un nœud avec une forme arrondie.",
        code: "  Enfant(Arrondi)",
      },
      {
        label: "Forme losange",
        description: "Déclare un nœud avec une forme de losange.",
        code: "  Enfant{Losange}",
      },
      {
        label: "Forme cercle",
        description: "Déclare un nœud avec une forme de cercle.",
        code: "  Enfant((Cercle))",
      },
      {
        label: "Forme hexagone",
        description: "Déclare un nœud avec une forme d'hexagone.",
        code: "  Enfant{{Hexagone}}",
      },
      {
        label: "Icônes (si support)",
        description:
          "Ajoute une icône à un nœud, si l'outil de rendu le supporte.",
        code: "  ::icon(fa fa-book) Enfant",
      },
    ],

    example: `mindmap
  root((Lancement Startup
  E-Commerce))

    Produit
      Définition
        Public cible
          Millenials urbains
          Budget moyen
        Proposition valeur
          Livraison rapide
          Prix compétitifs
          Qualité premium
      Catalogue
        Vêtements
        Accessoires
        Chaussures
      Sourcing
        Fournisseurs locaux
        Import Asie
        Dropshipping

    Technique
      Frontend
        React
          Next.js
          TypeScript
        Mobile
          React Native
        Design System
          Tailwind
          Figma
      Backend
        Node.js
          Express
          NestJS
        Base de données
          PostgreSQL
          Redis cache
        Hébergement
          AWS
          Vercel
          Docker
      Paiement
        Stripe
        PayPal
        Crypto (futur)

    Marketing
      Digital
        SEO
          Contenu blog
          Backlinks
        SEA
          Google Ads
          Meta Ads
        Social Media
          Instagram
          TikTok
          Pinterest
        Email
          Newsletter
          Automation
      Partenariats
        Influenceurs
        Affiliés
        Cross-promotion
      Analytics
        Google Analytics
        Hotjar
        A/B testing

    Équipe
      Fondateurs
        CEO
        CTO
        CMO
      Développement
        Frontend Dev
        Backend Dev
        DevOps
      Design
        UI/UX Designer
        Graphiste
      Business
        Product Manager
        Sales
        Support client

    Finance
      Budget initial
        100k€ seed
        Bootstrapping
      Coûts
        Développement
        Marketing
        Infrastructure
        Salaires
      Revenus
        Ventes directes
        Commissions
        Abonnements premium
      Levée fonds
        Business Angels
        VC Series A
        Crowdfunding

    Légal
      Structure
        SAS
        SASU
      Propriété intellectuelle
        Marque
        Nom domaine
      Conformité
        RGPD
        CGV/CGU
        Mentions légales
      Assurances
        RC Pro
        Cyber-risques`,
  },

  timeline: {
    title: "Créer une timeline (Frise chronologique)",
    description:
      "Les timelines représentent des événements ou périodes sur un axe chronologique. Elles sont parfaites pour visualiser l'histoire d'une entreprise, d'un produit, d'un projet, ou tout parcours temporel. Tu peux organiser les événements par sections thématiques pour plus de clarté. Voici une explication détaillée de chaque élément de syntaxe :",

    syntax: [
      {
        label: "Titre",
        description:
          "Déclare le titre de la timeline. Ce titre apparaît en haut du diagramme.",
        code: "timeline\n  title Titre de la timeline",
      },
      {
        label: "Section (période)",
        description:
          "Déclare une section ou une période thématique. Chaque section regroupe plusieurs événements.",
        code: "section Nom de la période",
      },
      {
        label: "Événement année",
        description: "Ajoute un événement associé à une année spécifique.",
        code: "  Événement : 2024",
      },
      {
        label: "Événement date",
        description: "Ajoute un événement associé à une date précise.",
        code: "  Événement : 15 mars 2024",
      },
      {
        label: "Période",
        description: "Ajoute une période couvrant plusieurs années ou mois.",
        code: "  Période longue : 2024-2025",
      },
      {
        label: "Plusieurs événements",
        description: "Ajoute plusieurs événements dans une même section.",
        code: "  Evt 1 : 2024\n  Evt 2 : 2024\n  Evt 3 : 2025",
      },
      {
        label: "Événement multiligne",
        description: "Ajoute un événement avec un texte long ou descriptif.",
        code: "  Événement avec texte très long : 2024",
      },
    ],

    example: `timeline
    title Évolution de l'Intelligence Artificielle

    section Origines (1940-1970)
      Test de Turing : 1950
      Conférence de Dartmouth (naissance IA) : 1956
      Premier chatbot ELIZA : 1966
      Premier "hiver de l'IA" : 1974-1980

    section Systèmes experts (1980-2000)
      Renouveau avec systèmes experts : 1980
      Deep Blue bat Kasparov aux échecs : 1997
      AIBO robot chien de Sony : 1999
      Deuxième "hiver de l'IA" : 1987-1993

    section Big Data & Machine Learning (2000-2012)
      Boom du Big Data : 2005
      ImageNet dataset : 2009
      IBM Watson gagne à Jeopardy : 2011
      AlexNet révolution Deep Learning : 2012

    section Deep Learning Revolution (2012-2020)
      Google rachète DeepMind : 2014
      AlphaGo bat Lee Sedol au Go : 2016
      Transformers architecture (Attention is All You Need) : 2017
      GPT-1 par OpenAI : 2018
      GPT-2 : 2019
      GPT-3 (175B paramètres) : 2020

    section ère des LLM (2020-2023)
      DALL-E génération d'images : 2021
      GPT-3.5 et ChatGPT lancé : Nov 2022
      Explosion virale ChatGPT (100M users) : Jan 2023
      GPT-4 multimodal : Mars 2023
      Bard by Google : Mars 2023
      Claude 2 by Anthropic : Juillet 2023
      Course aux LLM open-source (Llama 2, Mistral) : 2023

    section IA Générative mainstream (2024+)
      GPT-4 Turbo : 2024
      Intégration IA dans tous les produits : 2024
      Claude 3 family (Opus, Sonnet, Haiku) : Mars 2024
      Régulations IA (AI Act Europe) : 2024
      GPT-5 attendu : 2024-2025
      AGI (Artificial General Intelligence) ? : 2025-2030`,
  },

  // --- SUBGRAPH (corrigé) ---
  subgraph: {
    title: "Créer des sous-graphes organisés",
    description:
      "Les sous-graphes te permettent de regrouper visuellement des nœuds liés dans des conteneurs. C'est idéal pour représenter des sous-systèmes, des modules, ou des composants fonctionnels dans tes diagrammes de flux. Chaque sous-graphe peut avoir son propre titre et être stylisé indépendamment pour une meilleure organisation visuelle.",

    syntax: [
      {
        label: "Sous-graphe simple",
        description:
          "Crée un sous-graphe avec un titre. Tous les nœuds définis entre 'subgraph' et 'end' seront contenus dans le même conteneur visuel.",
        code: "subgraph Titre\n  A --> B\n  B --> C\nend",
      },
      {
        label: "Sous-graphes multiples",
        description:
          "Crée plusieurs sous-graphes pour organiser ton diagramme en sections logiques distinctes.",
        code: "subgraph ModuleA\n  A1 --> A2\nend\nsubgraph ModuleB\n  B1 --> B2\nend",
      },
      {
        label: "Connexions entre sous-graphes",
        description:
          "Relie des nœuds de différents sous-graphes pour montrer les interactions entre modules.",
        code: "subgraph Frontend\n  UI --> API\nend\nsubgraph Backend\n  API --> DB\nend\nUI --> API",
      },
      {
        label: "Sous-graphes imbriqués",
        description:
          "Crée des sous-graphes à l'intérieur d'autres sous-graphes pour une organisation hiérarchique.",
        code: "subgraph SystemePrincipal\n  subgraph Module1\n    A --> B\n  end\n  subgraph Module2\n    C --> D\n  end\nend",
      },
      {
        label: "Style des sous-graphes",
        description:
          "Applique des styles spécifiques aux sous-graphes pour les distinguer visuellement.",
        code: "style Frontend fill:#e1f5fe\nstyle Backend fill:#f3e5f5\nstyle Database fill:#e8f5e8",
      },
      {
        label: "ID de sous-graphe",
        description:
          "Utilise un ID pour référencer le sous-graphe dans les styles et autres configurations.",
        code: "subgraph id[Titre affiché]",
      },
      {
        label: "Alignement des sous-graphes",
        description:
          "Contrôle la disposition des sous-graphes avec des options d'alignement.",
        code: "subgraph Top\n  direction TB\n  A --> B\nend",
      },
    ],

    example: `graph TB
  %% On donne un ID aux sous-graphes (pas d'espaces dans l'ID) et un label affiché entre crochets
  subgraph front_end["Frontend Application"]
    Login[Page de connexion] --> Dashboard[Tableau de bord]
    Dashboard --> Settings[Paramètres]
    Settings --> Profile[Profil utilisateur]
  end

  subgraph backend_api["Backend API"]
    Auth[Service Authentification] --> User[Service Utilisateurs]
    Auth --> Products[Service Produits]
    User --> Database[(Base de données)]
    Products --> Database
    User --> Cache[(Cache Redis)]
  end

  subgraph external_services["External Services"]
    Payment[API Paiement Stripe]
    Email[Service Email SendGrid]
    Analytics[Google Analytics]
    CDN[Réseau de diffusion]
  end

  subgraph monitoring_logs["Monitoring & Logs"]
    Monitor[Système Monitoring]
    Logger[Agrégation Logs]
    Alert[Système d'alerte]
    Monitor --> Logger
    Logger --> Alert
  end

  %% Connexions principales (utiliser des nœuds existants, pas les titres de sous-graphes)
  Login --> Auth
  Dashboard --> User
  Dashboard --> Products
  Settings --> User
  Profile --> User

  %% Connexions services externes
  Products --> Payment
  User --> Email
  Dashboard --> Analytics
  Dashboard --> CDN

  %% Connexions monitoring (brancher des nœuds réels vers le monitoring)
  Auth --> Monitor
  Analytics --> Monitor

  %% Styles pour une meilleure visibilité (on cible les IDs des sous-graphes)
  style front_end fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#01579b
  style backend_api fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#4a148c
  style external_services fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px,color:#1b5e20
  style monitoring_logs fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#e65100

  %% Styles des nœuds
  style Login fill:#bbdefb
  style Dashboard fill:#90caf9
  style Auth fill:#ce93d8
  style Payment fill:#a5d6a7
  style Monitor fill:#ffcc80`,
  },

  styled: {
    title: "Personnaliser les styles et apparences",
    description:
      "Mermaid te permet de personnaliser complètement l'apparence de tes diagrammes. Tu peux modifier les couleurs, bordures, polices et appliquer des classes CSS pour rendre ton diagramme unique.",

    syntax: [
      {
        label: "Style individuel",
        description: "Applique un style directement à un nœud.",
        code: "style A fill:#f9f,stroke:#333,stroke-width:4px,color:#fff",
      },
      {
        label: "Définition de classe",
        description: "Définis une classe réutilisable pour plusieurs nœuds.",
        code: "classDef important fill:#ffcccc,stroke:#ff0000,stroke-width:2px,color:#800000",
      },
      {
        label: "Application de classe",
        description: "Applique une classe prédéfinie à un nœud.",
        code: "class A important",
      },
      {
        label: "Style des liens",
        description: "Personnalise l'apparence des connexions entre nœuds.",
        code: "linkStyle 0 stroke:#ff3,stroke-width:2px",
      },
    ],

    example: `graph TB
  Start((Début)) --> Input[Saisie]
  Input --> Validate{Valide ?}
  Validate -->|Oui| Process[Traitement]
  Validate -->|Non| Error[Erreur]
  Process --> End((Fin))
  Error --> Input

  %% Styles
  style Start fill:#98FB98,stroke:#228B22,stroke-width:2px
  style End fill:#FFDAB9,stroke:#CD853F,stroke-width:2px
  classDef important fill:#ffcccc,stroke:#ff0000,stroke-width:2px,color:#800000
  class Error important
  linkStyle 0 stroke:#228B22,stroke-width:2px
  linkStyle 1 stroke:#ff0000,stroke-width:2px,stroke-dasharray:3 3`,
  },

  interactive: {
    title: "Créer des diagrammes interactifs avec liens cliquables",
    description:
      "Ajoutez des liens cliquables et des infobulles pour rendre vos diagrammes interactifs. Idéal pour la documentation, les présentations dynamiques ou les prototypes d'application.",
    syntax: [
      {
        label: "Lien simple",
        description: "Ajoute un lien cliquable à un nœud, sans infobulle.",
        code: 'click A "https://example.com"',
      },
      {
        label: "Lien avec infobulle",
        description:
          "Ajoute un lien cliquable avec une infobulle qui s'affiche au survol.",
        code: 'click A "https://example.com" "Aller sur la page d\'accueil"',
      },
      {
        label: "Callback JavaScript",
        description:
          "Exécute une fonction JavaScript lors du clic sur un nœud. Nécessite `securityLevel: 'loose'` dans la configuration de Mermaid.",
        code: 'click A call handleNodeClick("A") "Noeud A sélectionné"',
      },
      {
        label: "Style personnalisé pour les nœuds cliquables",
        description:
          "Applique un style visuel distinct aux nœuds interactifs pour les rendre identifiables.",
        code: "classDef clickable fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,color:#0d47a1,cursor:pointer;",
      },
      {
        label: "Application du style à un nœud",
        description: "Associe le style `clickable` à un ou plusieurs nœuds.",
        code: "class Home,Contact clickable;",
      },
    ],
    example: `graph TB
    %% Définition des nœuds et de leur hiérarchie
    Home[Accueil] --> Products[Produits]
    Home --> Services[Services]
    Home --> Contact[Contact]
    Products --> Product1[Produit 1]
    Products --> Product2[Produit 2]
    Services --> Premium[Service Premium]
    Services --> Standard[Service Standard]
    
    %% Liens cliquables avec infobulles
    click Home "https://example.com" "Retour à l'accueil"
    click Products "https://example.com/products" "Voir nos produits"
    click Product1 "https://example.com/product1" "Détails du Produit 1"
    click Product2 "https://example.com/product2" "Détails du Produit 2"
    click Services "https://example.com/services" "Nos services"
    click Premium "https://example.com/premium" "Offre Premium"
    click Standard "https://example.com/standard" "Offre Standard"
    click Contact "https://example.com/contact" "Nous contacter"
    
    %% Styles pour les nœuds cliquables
    classDef home fill:#4CAF50,stroke:#2E7D32,color:white,stroke-width:2px,cursor:pointer;
    classDef product fill:#2196F3,stroke:#0D47A1,color:white,stroke-width:2px,cursor:pointer;
    classDef service fill:#FF9800,stroke:#E65100,color:white,stroke-width:2px,cursor:pointer;
    
    %% Application des styles
    class Home home
    class Products,Product1,Product2 product
    class Services,Premium,Standard service
    class Contact service`,
  },
};
