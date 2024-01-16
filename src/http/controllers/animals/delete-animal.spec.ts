import { app } from "@/app";
import request from "supertest";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { makeRegisterAddressUseCase } from "@/use-cases/factories/address/make-register-address-use-case";
import { randomUUID } from "node:crypto";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";
import { AnimalType, AnimalTemperament } from "@prisma/client";
import { makeRegisterAnimalUseCase } from "@/use-cases/factories/animals/make-register-use-case";

describe("Delete animal (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete a animal", async () => {
    const { token, orgId } = await createAndAuthenticateOrg(app);

    const addressData = {
      zipCode: "13836242",
      street: "Rua Exemplo, 123",
      city: "Conchal",
      state: "SP",
      country: "País Exemplo",
      addressNumber: "12",
    };
    const animalData = {
      type: AnimalType.dog,
      name: "tutu",
      age: 8,
      weight: 12,
      temperament: AnimalTemperament.docile,
      breed: "aaaa",
      addressId: "",
      orgId: "",
      description: "",
    };

    const registerAddressUseCase = makeRegisterAddressUseCase();
    const addressAnimalData = await registerAddressUseCase.execute(addressData);

    const registerAnimalUseCase = makeRegisterAnimalUseCase();
    await registerAnimalUseCase.execute({
      ...animalData,
      breed: animalData.breed || "",
      addressId: addressAnimalData.address.id,
      orgId,
    });

    const animalsResponse = await request(app.server).get(
      "/animal/list?city=Conchal"
    );

    const animalId = animalsResponse.body.animals[0].id;
    const response = await request(app.server)
      .delete(`/animal/${animalId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(204);
  });

  it("should not be able delete animal if is not authenticated", async () => {
    const response = await request(app.server).delete(
      `/animal/${randomUUID()}`
    );
    expect(response.status).toBe(401);
  });
});
