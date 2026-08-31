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

## Tests d'intégration

Les tests d'intégration vérifient le fonctionnement de plusieurs opérations
enchaînées de l'API.

Scénarios testés :

- Authentification et récupération du JWT
- Création puis récupération d'une tâche
- Modification puis vérification d'une tâche
- Suppression puis vérification de la suppression

## Tests E2E

<img src="docs/Capture d'écran 2026-08-31 163544.png" alt="Lancement Docker Compose" />
<img src="docs/Capture d'écran 2026-08-31 163830.png" alt="Lancement Docker Compose" />
<img src="docs/Capture d'écran 2026-08-31 167.png" alt="Lancement Docker Compose" />

Les tests E2E utilisent Selenium afin de simuler les actions d'un utilisateur
dans le navigateur.

Scénario actuel :

- Ouverture de l'application
- Connexion avec un utilisateur valide
- Vérification de la redirection vers le dashboard
