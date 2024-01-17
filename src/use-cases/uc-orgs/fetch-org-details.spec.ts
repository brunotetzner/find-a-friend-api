import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryAddressRepository } from "@/repositories/in-memory/in-memory-address-repository";
import { hash } from "bcryptjs";
import { FetchOrgDetailsUseCase } from "./fetch-org-details";
import { randomUUID } from "crypto";
import { OrgNotFoundError } from "../errors/org-not-found";

let orgsRepository: InMemoryOrgRepository;
let sut: FetchOrgDetailsUseCase;
let addressRepository: InMemoryAddressRepository;

const orgBody = {
  name: "Centro de adoção de madureira",
  phone: "+5519999890165",
  email: "centro1111@madureira.com",
  description: "teste",
  addressId: "",
};

describe("get org Use case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgRepository();
    addressRepository = new InMemoryAddressRepository();

    sut = new FetchOrgDetailsUseCase(orgsRepository);

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

  it("Should be able to get org details", async () => {
    const orgData = await orgsRepository.create({
      ...orgBody,
      password_hash: await hash("123456", 6),
    });

    const org = await sut.execute({
      orgId: orgData.id,
    });
    expect(org.id).toEqual(expect.any(String));
  });

  it("Should not be able to get org details when it does not exists", async () => {
    await orgsRepository.create({
      ...orgBody,
      password_hash: await hash("123456", 6),
    });
    await expect(
      async () =>
        await sut.execute({
          orgId: randomUUID(),
        })
    ).rejects.toBeInstanceOf(OrgNotFoundError);
  });
});
