import request from "supertest";
import { app } from "@/app";
import { it, describe, beforeAll, afterAll, expect } from "vitest";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate a org", async () => {
    const body = {
      name: "Centro de adoção de madureira",
      phone: "+5519999890165",
      email: "centro1111@madureira.com",
      password: "123456",
      address: {
        zipCode: "13836242",
        street: "Rua Exemplo, 123",
        city: "Cidade Exemplo",
        state: "SP",
        country: "País Exemplo",
        addressNumber: "12",
      },
      description: "teste12345",
    };
    await request(app.server).post("/org").send(body);

    const response = await request(app.server)
      .post("/org/authenticate")
      .send({ email: body.email, password: body.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
