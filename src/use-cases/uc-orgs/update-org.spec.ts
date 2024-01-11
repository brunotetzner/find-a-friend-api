import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryAddressRepository } from "@/repositories/in-memory/in-memory-address-repository";
import { UpdateOrgUseCase } from "./update-org";
import { hash } from "bcryptjs";

let orgsRepository: InMemoryOrgRepository;
let addressRepository: InMemoryAddressRepository;
let sut: UpdateOrgUseCase;

const orgBody = {
  name: "Centro de adoção de madureira",
  phone: "+5519999890165",
  email: "centro1111@madureira.com",
  password: "123456",
  description: "teste",
  addressId: "",
};

describe("update Org Use case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgRepository();
    addressRepository = new InMemoryAddressRepository();

    sut = new UpdateOrgUseCase(orgsRepository);

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

  it("Should be able to update a org", async () => {
    const cretedOrg = await orgsRepository.create({
      ...orgBody,
      password_hash: await hash("123456", 6),
    });

    const newName = "name test 2";
    const response = await sut.execute(cretedOrg.id, {
      ...orgBody,
      name: newName,
    });

    const updatedOrg = await orgsRepository.findById(cretedOrg.id);

    expect(response).toBeUndefined();
    expect(updatedOrg && updatedOrg.name).toEqual(newName);
  });
});
