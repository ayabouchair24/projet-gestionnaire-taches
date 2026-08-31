const request = require("supertest");
const app = require("../server");

describe("Tests d’intégration - API Tasks", () => {
  let authToken;
  let taskId;

  beforeAll(async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "password",
    });

    expect(response.statusCode).toBe(200);
    authToken = response.body.token;
  });

  test("Créer puis récupérer une tâche", async () => {
    const createResponse = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Tâche intégration",
        description: "Test du workflow complet",
        priority: "high",
      });

    expect(createResponse.statusCode).toBe(201);

    taskId = createResponse.body.id;

    const getResponse = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.id).toBe(taskId);
    expect(getResponse.body.title).toBe("Tâche intégration");
  });

  test("Modifier une tâche puis vérifier la modification", async () => {
    const updateResponse = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Tâche modifiée",
        status: "done",
        priority: "low",
      });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.title).toBe("Tâche modifiée");
    expect(updateResponse.body.status).toBe("done");
    expect(updateResponse.body.priority).toBe("low");

    const getResponse = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.title).toBe("Tâche modifiée");
  });

  test("Supprimer une tâche puis vérifier sa suppression", async () => {
    const deleteResponse = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(deleteResponse.statusCode).toBe(204);

    const getResponse = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(getResponse.statusCode).toBe(404);
  });
});
