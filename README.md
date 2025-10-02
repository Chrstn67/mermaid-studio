# Mermaid Studio

Un éditeur WYSIWYG moderne et intuitif pour créer, visualiser et explorer des diagrammes Mermaid en temps réel.

## À propos

Mermaid Studio est une application web qui te permet de créer facilement des diagrammes techniques sans avoir besoin d'outils complexes. Que tu sois développeur, chef de projet, ou simplement quelqu'un qui aime visualiser des idées, cette plateforme te donne tous les outils nécessaires pour créer des diagrammes professionnels.

## Fonctionnalités principales

### Éditeur WYSIWYG

- Édition en temps réel avec prévisualisation instantanée
- Détection automatique des erreurs de syntaxe
- Support de 6+ types de diagrammes différents
- Modèles prêts à l'emploi pour démarrer rapidement

### Galerie interactive

- Explore une collection de 15+ diagrammes d'exemple
- Filtrage par type de diagramme
- Recherche par titre ou tags
- Visualisation détaillée de chaque diagramme

### Contrôles avancés

- Zoom avant/arrière (molette souris + Ctrl)
- Déplacement par glisser-déposer
- Mode plein écran
- Copie du code en un clic

### Tutoriels intégrés

- Documentation complète pour chaque type de diagramme
- Exemples de syntaxe
- Conseils pratiques

## Types de diagrammes supportés

- **Flowchart** : Diagrammes de flux et organigrammes
- **Sequence Diagram** : Diagrammes de séquence pour les interactions
- **Class Diagram** : Modélisation orientée objet
- **State Diagram** : Machines à états
- **ER Diagram** : Modèles entité-relation pour bases de données
- **Git Graph** : Visualisation de workflows Git
- **Gantt** : Planification de projets
- **Pie Chart** : Graphiques circulaires
- **Journey** : Parcours utilisateur
- **Mindmap** : Cartes mentales
- **Timeline** : Chronologies
- **Block Diagram** : Diagrammes en blocs
- Et plus encore...

## Technologies utilisées

- **React** : Framework JavaScript pour l'interface utilisateur
- **React Router** : Navigation entre les pages
- **Mermaid.js** : Moteur de rendu des diagrammes
- **CSS3** : Styles modernes et responsive

## Structure du projet

```
src/
├── components/
│   ├── App.jsx              # Composant principal avec routing
│   ├── Header.jsx           # Navigation
│   ├── Footer.jsx           # Pied de page
│   ├── HomePage.jsx         # Page d'accueil
│   ├── List.jsx             # Galerie de diagrammes
│   ├── MermaidItem.jsx      # Vue détaillée d'un diagramme
│   ├── Editor.jsx           # Éditeur WYSIWYG
│   └── Tutorial.jsx         # Page tutoriels
├── data/
│   ├── data.js              # Données des diagrammes
│   └── tutorialData.js      # Contenu des tutoriels
└── styles/
    └── *.css                # Fichiers de styles
```

## Installation

```bash
# Clone le projet
git clone [url-du-repo]

# Installe les dépendances
npm install

# Lance le serveur de développement
npm run dev
```

## Utilisation

### Créer un nouveau diagramme

1. Va sur la page **Éditeur**
2. Choisis un modèle rapide ou écris ton propre code Mermaid
3. Le diagramme se met à jour automatiquement pendant que tu tapes
4. Utilise les contrôles de zoom pour ajuster la vue

### Explorer la galerie

1. Accède à la page **Galerie**
2. Filtre par type de diagramme ou recherche par mots-clés
3. Clique sur un diagramme pour voir les détails
4. Copie le code pour l'utiliser dans tes propres projets

### Apprendre la syntaxe

1. Consulte la section **Tutoriels**
2. Sélectionne le type de diagramme qui t'intéresse
3. Découvre la syntaxe de base avec des exemples concrets
4. Teste directement dans l'éditeur

## Conseils d'utilisation

- **Pour zoomer** : Utilise la molette de la souris avec Ctrl enfoncé, ou les boutons +/-
- **Pour déplacer** : Clique et glisse sur le diagramme
- **Pour copier** : Utilise le bouton "Copier" pour récupérer le code source
- **Pour un meilleur rendu** : Passe en mode plein écran pour les diagrammes complexes

## Exemples de cas d'usage

- Documentation technique de projets
- Modélisation de bases de données
- Planification de sprints et projets
- Architecture de systèmes et microservices
- Workflows Git et CI/CD
- Parcours utilisateur (UX)
- Diagrammes de classes (OOP)
- Séquences d'authentification et d'API

## Contribution

Les contributions sont les bienvenues ! N'hésite pas à :

- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Ajouter de nouveaux diagrammes d'exemple
- Améliorer la documentation

## Ressources externes

- [Documentation officielle Mermaid](https://mermaid-studio.js.org)
- [Exemples de diagrammes](https://mermaid-studio.js.org/ecosystem/integrations-community.html)
- [Syntaxe Mermaid](https://mermaid-studio.js.org/intro/syntax-reference.html)

## Licence

Ce projet est open source et gratuit d'utilisation.
