import { prisma } from "@/lib/prisma";
import { Prisma, Animal } from "@prisma/client";
import { AnimalsRepository } from "../animals-repository";

export class PrismaAnimalsRepository implements AnimalsRepository {
  async create(data: Prisma.AnimalUncheckedCreateInput): Promise<Animal> {
    const Animal = await prisma.animal.create({ data });
    return Animal;
  }

  async findById(id: string): Promise<Animal | null> {
    const Animal = await prisma.animal.findUnique({ where: { id } });
    return Animal || null;
  }

  async update(
    id: string,
    data: Prisma.AnimalUncheckedUpdateInput
  ): Promise<Animal> {
    const Animal = await prisma.animal.update({ where: { id }, data });
    return Animal;
  }
  async delete(id: string): Promise<void> {
    await prisma.animal.delete({ where: { id } });
  }
}
