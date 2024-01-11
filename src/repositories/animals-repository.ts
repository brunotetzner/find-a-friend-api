import { Animal, AnimalTemperament, AnimalType, Prisma } from "@prisma/client";

export interface AnimalsRepository {
  create(data: Prisma.AnimalUncheckedCreateInput): Promise<Animal>;
  findById(id: string): Promise<Animal | null>;
  update(id: string, data: Prisma.AnimalUncheckedUpdateInput): Promise<Animal>;
  delete(id: string): Promise<void>;
  findMany(params: {
    city: string;
    type?: AnimalType;
    age?: number;
    weight?: number;
    temperament?: AnimalTemperament;
    breed?: string;
    orgId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Animal[]>;
}
