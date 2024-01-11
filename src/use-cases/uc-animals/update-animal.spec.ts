import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryAddressRepository } from "@/repositories/in-memory/in-memory-address-repository";
import { hash } from "bcryptjs";
import { InMemoryAnimalsRepository } from "@/repositories/in-memory/in-memory-animals-repository";
import { Prisma } from "@prisma/client";
import { UpdateAnimalUseCase } from "./update-animal";

let orgsRepository: InMemoryOrgRepository;
let animalsRepository: InMemoryAnimalsRepository;
let addressRepository: InMemoryAddressRepository;
let sut: UpdateAnimalUseCase;

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

describe("Update Animals Use case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgRepository();
    addressRepository = new InMemoryAddressRepository();
    animalsRepository = new InMemoryAnimalsRepository();

    sut = new UpdateAnimalUseCase(animalsRepository);

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

  it("Should be able to update an animal", async () => {
    const org = await orgsRepository.create({
      ...orgBody,
      password_hash: await hash("123456", 6),
    });

    animalBody.orgId = org.id;
    animalBody.addressId = org.addressId;

    const animal = await animalsRepository.create({
      ...animalBody,
      breed: animalBody.breed || "",
    });

    await sut.execute(animal.id, {
      ...animalBody,
      name: "Sofia",
    });
    const updatedAnimal = await animalsRepository.findById(animal.id);
    expect(updatedAnimal && updatedAnimal.name).toEqual("Sofia");
    expect(updatedAnimal && updatedAnimal.age).toEqual(animalBody.age);
  });
});
