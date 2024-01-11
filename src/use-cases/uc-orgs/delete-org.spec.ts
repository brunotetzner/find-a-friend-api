import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryAddressRepository } from "@/repositories/in-memory/in-memory-address-repository";
import { hash } from "bcryptjs";
import { DeleteOrgUseCase } from "./delete-org";

let orgsRepository: InMemoryOrgRepository;
let addressRepository: InMemoryAddressRepository;
let sut: DeleteOrgUseCase;

const orgBody = {
  name: "Centro de adoção de madureira",
  phone: "+5519999890165",
  email: "centro1111@madureira.com",
  description: "teste",
  addressId: "",
};

describe("delete Org Use case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgRepository();
    addressRepository = new InMemoryAddressRepository();

    sut = new DeleteOrgUseCase(orgsRepository);

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

  it("Should be able to delete", async () => {
    const org = await orgsRepository.create({
      ...orgBody,
      password_hash: await hash("123456", 6),
    });
    await sut.execute(org.id);
    const getOrg = await orgsRepository.findById(org.id);
    expect(getOrg).toEqual(null);
  });
});
