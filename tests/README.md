Stratégie de Tests — Gestionnaire de Tâches



Ce document décrit l'approche de test mise en place pour le projet, les outils choisis, et l'organisation du dossier tests/.



Objectifs

Garantir la fiabilité des fonctionnalités CRUD (création, modification, suppression, attribution de tâches).

Détecter les régressions avant chaque merge grâce à l'intégration continue (GitHub Actions).

Maintenir une qualité de code homogène sur l'ensemble du projet (ESLint).

Stack de test

Type de test	Outil	Statut

Analyse de code	ESLint	Obligatoire

Tests E2E	Selenium + Jest	Obligatoire

Couverture de code	Jest --coverage	Obligatoire

Tests unitaires	Jest	Bonus

Tests d'intégration	Jest + Supertest	Bonus

Organisation du dossier

tests/

├── unit/          # Tests de fonctions et modules isolés (bonus)

├── integration/   # Tests des routes API avec Supertest (bonus)

├── e2e/           # Scénarios utilisateurs complets avec Selenium (obligatoire)

└── README.md      # Ce document

Convention de nommage

Fichiers de test : \*.test.js (unitaire/intégration) et \*.selenium.test.js (E2E).

Un fichier de test par module/route testé, nommé sur le même modèle que le fichier source (ex. tache.js → tache.test.js).

Comment lancer les tests

bash

\# Analyse de code

npm run lint



\# Tests unitaires + intégration, avec couverture

npm run test:coverage



\# Tests E2E (nécessite que le backend et le frontend tournent en local)

npm run test:e2e

Intégration continue



Chaque Pull Request déclenche automatiquement, via GitHub Actions (.github/workflows/tests.yml) :



L'analyse de code avec ESLint.

Les tests unitaires et d'intégration avec rapport de couverture.

Les tests E2E Selenium, une fois le job précédent validé.



Une PR ne peut être mergée que si l'ensemble de ces vérifications passe (règle de protection de branche sur main).



État d'avancement







