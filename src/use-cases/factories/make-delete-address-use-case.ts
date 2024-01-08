import { DeleteAddressUseCase } from "../delete-address";
import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository";

export function makeDeleteAddressUseCase() {
  const AddressRepository = new PrismaAddressRepository();

  const useCase = new DeleteAddressUseCase(AddressRepository);

  return useCase;
}
