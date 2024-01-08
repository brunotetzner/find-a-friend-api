import { AddressRepository } from "../address-repository";
import { prisma } from "@/lib/prisma";
import { Prisma, Address } from "@prisma/client";

export class PrismaAddressRepository implements AddressRepository {
  async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
    const address = await prisma.address.create({ data });
    return address;
  }
  async delete(id: string): Promise<void> {
    await prisma.address.delete({ where: { id } });
  }
}
