import { describe, beforeEach, expect, it } from "vitest";
import { InMemoryAddressRepository } from "@/repositories/in-memory/in-memory-address-repository";
import { RegisterAddressUseCase } from "./register-address";
import { ViaCepNotFoundError } from "../errors/via-cep-not-found";

let addressRepository: InMemoryAddressRepository;
let sut: RegisterAddressUseCase;

describe("create address Use case", () => {
  beforeEach(async () => {
    addressRepository = new InMemoryAddressRepository();

    sut = new RegisterAddressUseCase(addressRepository);
  });

  const addressData = {
    zipCode: "13836242",
    street: "Rua Exemplo, 123",
    city: "Cidade Exemplo",
    state: "SP",
    country: "País Exemplo",
    addressNumber: "12",
  };

  it("Should be able to create an address", async () => {
    const { address } = await sut.execute(addressData);
    expect(address).toHaveProperty("id");
  });

  it("Should be not able to create an address when cep is invalid", async () => {
    addressData.zipCode = "1111111111";
    await expect(() => sut.execute(addressData)).rejects.toBeInstanceOf(
      ViaCepNotFoundError
    );
  });
});
