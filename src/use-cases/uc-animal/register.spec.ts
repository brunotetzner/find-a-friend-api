import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryAddressRepository } from "@/repositories/in-memory/in-memory-address-repository";
import { RegisterAnimalUseCase } from "./register";
import { hash } from "bcryptjs";
import { InMemoryAnimalsRepository } from "@/repositories/in-memory/in-memory-animals-repository";
import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { OrgNotFoundError } from "../errors/org-not-found";

let orgsRepository: InMemoryOrgRepository;
let animalsRepository: InMemoryAnimalsRepository;
let addressRepository: InMemoryAddressRepository;
let sut: RegisterAnimalUseCase;

const orgBody = {
  name: "Centro de adoção de madureira",
  phone: "+5519999890165",
  email: "centro1111@madureira.com",
  description: "teste",
  addressId: "",
};

const animalBody: Prisma.AnimalUncheckedCreateInput = {
  type: "dog",
  name: "tutu",
  age: 8,
  weight: 12,
  temperament: "docile",
  breed: "aaaa",
  addressId: "",
  orgId: "",
  description: "",
};

describe("Register Animals Use case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgRepository();
    addressRepository = new InMemoryAddressRepository();
    animalsRepository = new InMemoryAnimalsRepository();

    sut = new RegisterAnimalUseCase(animalsRepository, orgsRepository);

    const { id } = await addressRepository.create({
      zipCode: "13836242",
      street: "Rua Exemplo, 123",
      city: "Cidade Exemplo",
      state: "SP",
      country: "País Exemplo",
      addressNumber: "12",
    });

    orgBody.addressId = id;
  });

  it("Should be able to register an animal", async () => {
    const org = await orgsRepository.create({
      ...orgBody,
      password_hash: await hash("123456", 6),
    });

    animalBody.orgId = org.id;
    animalBody.addressId = org.addressId;

    const { animal } = await sut.execute({
      ...animalBody,
      breed: animalBody.breed || "",
    });
    expect(animal.id).toEqual(expect.any(String));
  });

  it("Should not be able to register when the org does not exists", async () => {
    animalBody.orgId = randomUUID();
    animalBody.addressId = randomUUID();

    await expect(() =>
      sut.execute({
        ...animalBody,
        breed: animalBody.breed || "",
      })
    ).rejects.toBeInstanceOf(OrgNotFoundError);
  });
});
