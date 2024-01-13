import { app } from "@/app";
import request from "supertest";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { makeRegisterAddressUseCase } from "@/use-cases/factories/address/make-register-address-use-case";
import { makeRegisterOrgUseCase } from "@/use-cases/factories/orgs/make-register-use-case";
import { makeRegisterAnimalUseCase } from "@/use-cases/factories/animals/make-register-use-case";
import { AnimalTemperament, AnimalType } from "@prisma/client";
import { randomUUID } from "node:crypto";

const orgData = {
  name: "Centro de adoção de madureira",
  phone: "+5519999890165",
  email: "centro1111@madureira.com",
  description: "teste",
  addressId: "",
  password: "123456",
};

describe("Fetch animal details (e2e)", () => {
  beforeAll(async () => {
    await app.ready();

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

    const addressData = {
      zipCode: "13836242",
      street: "Rua Exemplo, 123",
      city: "Conchal",
      state: "SP",
      country: "País Exemplo",
      addressNumber: "12",
    };
    const registerOrgUseCase = makeRegisterOrgUseCase();
    const registerUseCase = makeRegisterAnimalUseCase();
    const registerAddressUseCase = makeRegisterAddressUseCase();

    const addressOrgData = await registerAddressUseCase.execute(addressData);
    const addressDogData = await registerAddressUseCase.execute(addressData);

    const orgResponse = await registerOrgUseCase.execute({
      ...orgData,
      addressId: addressOrgData.address.id,
    });

    await registerUseCase.execute({
      ...animalData,
      breed: animalData.breed || "",
      addressId: addressDogData.address.id,
      orgId: orgResponse.org.id,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get a animal", async () => {
    const animalsResponse = await request(app.server).get(
      "/animal/list?city=Conchal"
    );
    const animalId = animalsResponse.body.animals[0].id;
    const response = await request(app.server).get(`/animal/${animalId}`);
    const animal = response.body.animal;

    expect(response.status).toBe(200);
    expect(animal).toHaveProperty("id");
    expect(animal).toHaveProperty("name");
    expect(animal).toHaveProperty("temperament");
    expect(animal.address).toHaveProperty("id");
  });

  it("should return an error when the animal doesn`t exists", async () => {
    const response = await request(app.server).get(`/animal/${randomUUID()}`);
    expect(response.status).toBe(404);
  });
});
