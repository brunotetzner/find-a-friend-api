import { prisma } from "@/lib/prisma";
import { Prisma, Animal, AnimalTemperament, AnimalType } from "@prisma/client";
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

async findMany({
    city,
    type,
    minAge,
    maxAge,
    weight,
    temperament,
    breed,
    orgId,
    page = 1,
    pageSize = 10,
  }: {
    city: string;
    type?: AnimalType;
    minAge?: number;
    maxAge?: number;
    weight?: number;
    temperament?: AnimalTemperament;
    breed?: string;
    orgId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Animal[]> {
    const skip = (page - 1) * pageSize;

    return prisma.animal.findMany({
      where: {
        address: { city },
        type,
        age: {
          gte: minAge || undefined,
          lte: maxAge || undefined,
        },
        weight,
        temperament,
        breed,
        orgId,
      },
       orderBy: {
        created_at: 'desc', // Ordenar por created_at em ordem decrescente
      },
      skip,
      take: pageSize,
    });
  }
}
