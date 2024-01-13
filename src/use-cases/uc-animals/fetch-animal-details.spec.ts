import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryAnimalsRepository } from "@/repositories/in-memory/in-memory-animals-repository";
import { FetchAnimalsDetailsUseCase } from "./fetch-animal-details";
import { randomUUID } from "crypto";
import { AnimalNotFoundError } from "../errors/animal-not-found";
import { InMemoryAddressRepository } from "@/repositories/in-memory/in-memory-address-repository";
import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";

let animalsRepository: InMemoryAnimalsRepository;
let sut: FetchAnimalsDetailsUseCase;
let addressRepository: InMemoryAddressRepository;
let orgsRepository: InMemoryOrgRepository;

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

const orgBody = {
  name: "Centro de adoção de madureira",
  phone: "+5519999890165",
  email: "centro1111@madureira.com",
  description: "teste",
  addressId: "",
};

let addresId = "";
let orgId = "";

describe("get animal Use case", () => {
  beforeEach(async () => {
    animalsRepository = new InMemoryAnimalsRepository();
    orgsRepository = new InMemoryOrgRepository();
    addressRepository = new InMemoryAddressRepository();
    sut = new FetchAnimalsDetailsUseCase(animalsRepository);

    const address = await addressRepository.create({
      zipCode: "13836242",
      street: "Rua Exemplo, 123",
      city: "Cidade Exemplo",
      state: "SP",
      country: "País Exemplo",
      addressNumber: "12",
    });

    const org = await orgsRepository.create({
      ...orgBody,
      password_hash: await hash("123456", 6),
      addressId: address.id,
    });

    addresId = address.id;
    orgId = org.id;
  });

  it("Should be able to get animal details", async () => {
    const animalData = await animalsRepository.create({
      ...animalBody,
      addressId: addresId,
      orgId: orgId,
    });
    const { animal } = await sut.execute({
      animalId: animalData.id,
    });

    expect(animal.id).toEqual(expect.any(String));
    expect(animal.name).toEqual(animalBody.name);
  });

  it("Should not be able to get animal details when it does not exist", async () => {
    await expect(
      async () =>
        await sut.execute({
          animalId: randomUUID(),
        })
    ).rejects.toBeInstanceOf(AnimalNotFoundError);
  });
});
