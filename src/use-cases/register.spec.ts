import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryAddressRepository } from "@/repositories/in-memory/in-memory-address-repository";
import { RegisterUseCase } from "./register";
import { OrgAlreadyExistsError } from "./errors/org-already-exists";
import { compare } from "bcryptjs";

let orgsRepository: InMemoryOrgRepository;
let addressRepository: InMemoryAddressRepository;
let sut: RegisterUseCase;

const orgBody = {
  name: "Centro de adoção de madureira",
  phone: "+5519999890165",
  email: "centro1111@madureira.com",
  password: "123456",
  description: "teste",
  addressId: "",
};

describe("Register Org in Use case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgRepository();
    addressRepository = new InMemoryAddressRepository();

    sut = new RegisterUseCase(orgsRepository);

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

  it("Should be able to register", async () => {
    const { org } = await sut.execute(orgBody);

    expect(org.id).toEqual(expect.any(String));
  });

  it("Should not be able to register twice with the seme e-mail", async () => {
    await sut.execute(orgBody);

    await expect(() => sut.execute(orgBody)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError
    );
  });

  it("Should hash org upon registration", async () => {
    const { org } = await sut.execute(orgBody);

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      org.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
