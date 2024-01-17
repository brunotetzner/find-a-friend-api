import { AddressRepository } from "@/repositories/address-repository";
import { Address } from "@prisma/client";
import { VIACEP } from "@/integration/viacep/integration";
import { CreateAddressBody } from "@/dtos/address.dto";

interface RegisterAddressUseCaseResponse {
  address: Address;
}
export class RegisterAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}
  async execute(
    body: CreateAddressBody
  ): Promise<RegisterAddressUseCaseResponse> {
    const viaCepResponse = await VIACEP.getAddress(body.zipCode);

    const addressBody = {
      zipCode: body.zipCode,
      street: viaCepResponse.logradouro || body.street,
      city: viaCepResponse.localidade || body.city || "",
      state: viaCepResponse.uf || body.state || "",
      country: "Brasil",
      addressNumber: body.addressNumber.toString(),
    };

    const address = await this.addressRepository.create(addressBody);

    return { address };
  }
}
