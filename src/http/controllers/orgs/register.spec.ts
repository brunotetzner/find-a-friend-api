import request from "supertest";
import { app } from "@/app";
import { it, describe, beforeAll, afterAll, expect } from "vitest";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a org", async () => {
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
      description: "",
    };
    const response = await request(app.server).post("/org").send(body);

    expect(response.status).toBe(201);
  });
});
