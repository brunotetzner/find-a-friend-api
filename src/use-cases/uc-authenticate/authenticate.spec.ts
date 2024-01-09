import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { InMemoryAddressRepository } from "@/repositories/in-memory/in-memory-address-repository";

let orgRepository: InMemoryOrgRepository;
let addressRepository: InMemoryAddressRepository;
let sut: AuthenticateUseCase;

const orgBody = {
  name: "Centro de adoção de madureira",
  phone: "+5519999890165",
  email: "centro1111@madureira.com",
  description: "teste",
  addressId: "",
};
describe("Authenticate Use case", () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository();
    addressRepository = new InMemoryAddressRepository();
    sut = new AuthenticateUseCase(orgRepository);

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
  it("Should be able to authenticate", async () => {
    await orgRepository.create({
      ...orgBody,
      password_hash: await hash("123456", 6),
    });

    const { org } = await sut.execute({
      email: orgBody.email,
      password: "123456",
    });
    expect(org.id).toEqual(expect.any(String));
  });

  it("Should not be able to authenticate with wrong email", async () => {
    await orgRepository.create({
      ...orgBody,
      password_hash: await hash("123456", 6),
    });

    await expect(
      async () =>
        await sut.execute({
          email: "jondoe1@example.com",
          password: "123456",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able to authenticate with wrong password", async () => {
    await orgRepository.create({
      ...orgBody,
      password_hash: await hash("123456", 6),
    });

    await expect(
      async () =>
        await sut.execute({
          email: orgBody.email,
          password: "1234567",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
