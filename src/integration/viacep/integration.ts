import { ViaCepNotFoundError } from "@/use-cases/errors/via-cep-not-found";
import { axiosInstance } from "./instance";
import { IViaCepResponse } from "./interface";

export class VIACEP {
  static async getAddress(cep: string) {
    const { data } = await axiosInstance
      .get<IViaCepResponse>(`${cep}/json`)
      .catch(() => {
        throw new ViaCepNotFoundError();
      });
    return data;
  }
}
