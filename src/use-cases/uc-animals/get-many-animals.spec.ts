import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryAddressRepository } from "@/repositories/in-memory/in-memory-address-repository";
import { InMemoryAnimalsRepository } from "@/repositories/in-memory/in-memory-animals-repository";
import { GetManyAnimalsUseCase } from "./get-many-animals";
import { CityIsRequiredError } from "../errors/city-is-required-error";

let orgsRepository: InMemoryOrgRepository;
let animalsRepository: InMemoryAnimalsRepository;
let addressRepository: InMemoryAddressRepository;
let sut: GetManyAnimalsUseCase;

describe("Get Many Animals Use case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgRepository();
    addressRepository = new InMemoryAddressRepository();
    animalsRepository = new InMemoryAnimalsRepository();

    const org = await orgsRepository.create({
      name: "Centro de adoção de madureira",
      phone: "+5519999890165",
      email: "centro1111@madureira.com",
      description: "teste",
      password_hash: "hashed_password",
      addressId: "",
    });

    const address = await addressRepository.create({
      zipCode: "13836242",
      street: "Rua Exemplo, 123",
      city: "Cidade Exemplo",
      state: "SP",
      country: "País Exemplo",
      addressNumber: "12",
    });

    org.addressId = address.id;
    await orgsRepository.update(org.id, org);

    sut = new GetManyAnimalsUseCase(animalsRepository, orgsRepository);
  });

  it("should be able to list animals", async () => {
    const animalsResponse = await sut.execute({
      city: "Cidade Exemplo",
    });

    expect(animalsResponse?.animals).toEqual(expect.any(Array));
  });

  it("should not be able to list animals when user does not inform the city", async () => {
    await expect(() =>
      sut.execute({
        city: "",
      })
    ).rejects.toBeInstanceOf(CityIsRequiredError);
  });
});
