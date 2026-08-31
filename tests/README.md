# Tests automatisés

Cette partie du projet concerne les tests automatisés de l'API backend.

##  Technologies

* **Jest** : framework de tests
* **Supertest** : tests des endpoints HTTP

## Structure

```text
backend/
├── server.js
└── tests/
    └── server.test.js
```

## Lancer les tests

Depuis le dossier `backend` :

```bash
npm install
npm test
```

Pour générer la couverture :

```bash
npm run test:coverage
```

## Tests réalisés

Les tests couvrent :

* `GET /health`
* Authentification avec identifiants valides/invalides
* `GET /api/tasks`
* `GET /api/tasks/:id`
* `POST /api/tasks`
* `PUT /api/tasks/:id`
* `DELETE /api/tasks/:id`
* Gestion des erreurs `400`, `401` et `404`

Les endpoints protégés sont testés avec un token JWT obtenu lors de la connexion.

## Résultats

La suite actuelle contient **13 tests automatisés** couvrant les principales fonctionnalités de l'API.

```bash
npm test
```

Les tests doivent être exécutés avant chaque Pull Request afin de détecter les régressions.

## À venir

* Tests frontend avec Vitest / React Testing Library
* Tests E2E avec Selenium
* Intégration des tests dans GitHub Actions
* Suivi de la couverture de code
