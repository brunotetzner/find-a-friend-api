import { prisma } from "@/lib/prisma";
import { Prisma, Animal, AnimalTemperament, AnimalType } from "@prisma/client";
import { AnimalsRepository } from "../animals-repository";

export class PrismaAnimalsRepository implements AnimalsRepository {
  async create(data: Prisma.AnimalUncheckedCreateInput): Promise<Animal> {
    const Animal = await prisma.animal.create({ data });
    return Animal;
  }

  async findById(id: string): Promise<Animal | null> {
    const Animal = await prisma.animal.findUnique({
      where: { id },
      include: { address: true },
    });
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
    order,
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
    order?: "asc" | "desc";
  }): Promise<{ animals: Animal[]; totalPages: number }> {
    if (!pageSize) pageSize = 10;
    if (!page) page = 1;
    const skip = (page - 1) * pageSize;

    const filterParams = {
      address: { city },
      type,
      age: {
        gte: minAge !== undefined ? minAge : undefined,
        lte: maxAge !== undefined ? maxAge : undefined,
      },
      weight: weight !== undefined ? weight : undefined,
      temperament: temperament !== undefined ? temperament : undefined,
      breed: breed !== undefined ? breed : undefined,
      orgId: orgId !== undefined ? orgId : undefined,
      orderBy: {
        created_at: order || "desc",
      },
    };

    const [animals, totalAnimals] = await prisma.$transaction([
      prisma.animal.findMany({
        where: filterParams,
        skip,
        take: pageSize,
      }),
      prisma.animal.count({ where: filterParams }),
    ]);

    const totalPages = Math.ceil(totalAnimals / pageSize);
    return { totalPages, animals };
  }
}
