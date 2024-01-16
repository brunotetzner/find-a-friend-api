import { app } from "@/app";
import request from "supertest";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { makeRegisterAddressUseCase } from "@/use-cases/factories/address/make-register-address-use-case";
import { makeRegisterOrgUseCase } from "@/use-cases/factories/orgs/make-register-use-case";

const orgData = {
  name: "Centro de adoção de madureira",
  phone: "+5519999890165",
  email: "centro1111@madureira.com",
  description: "teste",
  addressId: "",
  password: "123456",
};

describe("Update org (e2e)", () => {
  beforeAll(async () => {
    await app.ready();

    const addressData = {
      zipCode: "13836242",
      street: "Rua Exemplo, 123",
      city: "Conchal",
      state: "SP",
      country: "País Exemplo",
      addressNumber: "12",
    };
    const registerAddressUseCase = makeRegisterAddressUseCase();

    const addressOrgData = await registerAddressUseCase.execute(addressData);
    orgData.addressId = addressOrgData.address.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update an org", async () => {
    const registerOrgUseCase = makeRegisterOrgUseCase();
    await registerOrgUseCase.execute(orgData);

    const loginResponse = await request(app.server)
      .post("/org/authenticate")
      .send({ email: orgData.email, password: orgData.password });

    const response = await request(app.server)
      .patch("/org")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({ name: "Centro de adoção de teste" });
    expect(response.status).toBe(204);
  });

  it("should not be able update an org if is not authenticated", async () => {
    const response = await request(app.server)
      .patch("/org")
      .send({ name: "Centro de adoção de teste" });
    expect(response.status).toBe(401);
  });
});
