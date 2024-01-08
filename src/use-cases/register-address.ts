import { AddressRepository } from "@/repositories/address-repository";
import { Address } from "@prisma/client";
import axios from "axios";
import { ViaCepNotFoundError } from "./errors/via-cep-not-found";

interface RegisterAddressUseCaseRequest {
  zipCode: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  addressNumber: string;
}

interface RegisterAddressUseCaseResponse {
  address: Address;
}
export class RegisterAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}
  async execute(
    body: RegisterAddressUseCaseRequest
  ): Promise<RegisterAddressUseCaseResponse> {
    interface IViaCepResponse {
      cep: string;
      logradouro: string;
      complemento: string;
      bairro: string;
      localidade: string;
      uf: string;
      ibge: string;
      gia: string;
      ddd: string;
      siafi: string;
      erro?: boolean;
    }

    let viaCepResponse: IViaCepResponse = {
      cep: "",
      logradouro: "",
      complemento: "",
      bairro: "",
      localidade: "",
      uf: "",
      ibge: "",
      gia: "",
      ddd: "",
      siafi: "",
    };
    const apiUrl = "https://viacep.com.br/ws";
    await axios
      .get(`${apiUrl}/${body.zipCode}/json`)
      .then((res) => {
        const response = res.data;
        console.log(response);
        if (response.erro) {
          throw new ViaCepNotFoundError();
        }
        viaCepResponse = response;
      })
      .catch(() => {
        throw new ViaCepNotFoundError();
      });

    const addressBody = {
      zipCode: body.zipCode,
      street: viaCepResponse.logradouro || body.street,
      city: viaCepResponse.localidade || body.city || "",
      state: viaCepResponse.uf || body.state || "",
      country: "Brasil",
      addressNumber: body.addressNumber,
    };

    const address = await this.addressRepository.create(addressBody);

    return { address };
  }
}
