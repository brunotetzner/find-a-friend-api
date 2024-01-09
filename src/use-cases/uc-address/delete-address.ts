import { AddressRepository } from "@/repositories/address-repository";

export class DeleteAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}
  async execute(id: string): Promise<void> {
    await this.addressRepository.delete(id);
  }
}
