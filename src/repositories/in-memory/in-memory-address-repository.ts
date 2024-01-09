import { Prisma, Address } from "@prisma/client";
import { AddressRepository } from "../address-repository";
import { randomUUID } from "crypto";

export class InMemoryAddressRepository implements AddressRepository {
  public items: Address[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
    const address = {
      id: randomUUID(),
      zipCode: data.zipCode,
      street: data.street || null,
      city: data.city,
      state: data.state,
      country: data.country,
      addressNumber: data.addressNumber || null,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.items.push(address);
    return address;
  }
  delete(id: string): Promise<void> {
    const index = this.items.findIndex((item: Address) => item.id === id);

    this.items.splice(index, 1);

    return Promise.resolve();
  }
}
