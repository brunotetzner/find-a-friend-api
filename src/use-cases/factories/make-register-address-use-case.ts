import { RegisterAddressUseCase } from "../uc-address/register-address";
import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository";

export function makeRegisterAddressUseCase() {
  const AddressRepository = new PrismaAddressRepository();

  const useCase = new RegisterAddressUseCase(AddressRepository);

  return useCase;
}
