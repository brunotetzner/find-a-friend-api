import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryAddressRepository } from "@/repositories/in-memory/in-memory-address-repository";
import { hash } from "bcryptjs";
import { DeleteAnimalUseCase } from "./delete-animal";
import { InMemoryAnimalsRepository } from "@/repositories/in-memory/in-memory-animals-repository";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { Prisma } from "@prisma/client";

let animalsRepository: InMemoryAnimalsRepository;
let orgsRepository: InMemoryOrgRepository;
let addressRepository: InMemoryAddressRepository;
let sut: DeleteAnimalUseCase;

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
describe("delete Animal Use case", () => {
  beforeEach(async () => {
    animalsRepository = new InMemoryAnimalsRepository();
    addressRepository = new InMemoryAddressRepository();
    orgsRepository = new InMemoryOrgRepository();

    sut = new DeleteAnimalUseCase(animalsRepository);

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

  it("Should be able to delete a animals", async () => {
    const org = await orgsRepository.create({
      ...orgBody,
      password_hash: await hash("123456", 6),
    });
    await sut.execute(org.id);
    animalBody.orgId = org.id;
    animalBody.addressId = org.addressId;

    const animal = await animalsRepository.create({
      ...animalBody,
      breed: animalBody.breed || "",
    });

    await sut.execute(animal.id);

    const getAnimal = await animalsRepository.findById(animal.id);
    expect(getAnimal).toEqual(null);
  });
});
