const request = require("supertest");
const app = require("../server");

describe("Health check", () => {
  test("GET /health doit retourner 200", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("OK");
    expect(response.body.timestamp).toBeDefined();
  });
});

describe("Authentication API", () => {
  test("POST /api/auth/login doit connecter un utilisateur valide", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "password",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe("admin@test.com");
  });

  test("POST /api/auth/login doit refuser un mauvais mot de passe", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "mauvais-mot-de-passe",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Identifiants invalides");
  });

  test("POST /api/auth/login doit refuser un utilisateur inexistant", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "inexistant@test.com",
      password: "password",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Identifiants invalides");
  });
});

describe("Tasks API", () => {
  let authToken;

  beforeAll(async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "password",
    });

    authToken = response.body.token;
  });

  test("GET /api/tasks doit retourner les tâches", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/tasks doit refuser une requête sans token", async () => {
    const response = await request(app).get("/api/tasks");

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Token d'accès requis");
  });

  test("POST /api/tasks doit créer une tâche", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Tâche de test",
        description: "Description de test",
        priority: "high",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Tâche de test");
    expect(response.body.description).toBe("Description de test");
    expect(response.body.priority).toBe("high");
    expect(response.body.status).toBe("todo");
    expect(response.body.id).toBeDefined();
  });

  test("POST /api/tasks doit refuser une tâche sans titre", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        description: "Une tâche sans titre",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Le titre est requis");
  });

  test("GET /api/tasks/:id doit retourner une tâche existante", async () => {
    const response = await request(app)
      .get("/api/tasks/1")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("1");
  });

  test("GET /api/tasks/:id doit retourner 404 si la tâche n’existe pas", async () => {
    const response = await request(app)
      .get("/api/tasks/inexistant")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Tâche non trouvée");
  });

  test("PUT /api/tasks/:id doit modifier une tâche", async () => {
    const response = await request(app)
      .put("/api/tasks/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Tâche modifiée",
        status: "done",
        priority: "high",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Tâche modifiée");
    expect(response.body.status).toBe("done");
    expect(response.body.priority).toBe("high");
  });

  test("PUT /api/tasks/:id doit retourner 404 si la tâche n’existe pas", async () => {
    const response = await request(app)
      .put("/api/tasks/inexistant")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Tâche inexistante",
      });

    expect(response.statusCode).toBe(404);
  });

  test("DELETE /api/tasks/:id doit supprimer une tâche", async () => {
    const createResponse = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Tâche à supprimer",
      });

    const taskId = createResponse.body.id;

    const deleteResponse = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(deleteResponse.statusCode).toBe(204);
  });

  test("DELETE /api/tasks/:id doit retourner 404 si la tâche n’existe pas", async () => {
    const response = await request(app)
      .delete("/api/tasks/inexistant")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(404);
  });
});
