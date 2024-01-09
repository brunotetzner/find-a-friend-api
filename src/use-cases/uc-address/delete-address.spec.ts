import { describe, beforeEach, expect, it } from "vitest";
import { InMemoryAddressRepository } from "@/repositories/in-memory/in-memory-address-repository";
import { DeleteAddressUseCase } from "./delete-address";

let addressRepository: InMemoryAddressRepository;
let sut: DeleteAddressUseCase;

describe("Delete address Use case", () => {
  beforeEach(async () => {
    addressRepository = new InMemoryAddressRepository();

    sut = new DeleteAddressUseCase(addressRepository);
  });

  it("Should be able to delete an address", async () => {
    const { id } = await addressRepository.create({
      zipCode: "13836242",
      street: "Rua Exemplo, 123",
      city: "Cidade Exemplo",
      state: "SP",
      country: "País Exemplo",
      addressNumber: "12",
    });
    const response = await sut.execute(id);
    expect(response).toBeUndefined();
  });
});
