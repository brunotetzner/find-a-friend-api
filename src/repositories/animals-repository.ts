import { Animal, Prisma } from "@prisma/client";

export interface AnimalsRepository {
  create(data: Prisma.AnimalUncheckedCreateInput): Promise<Animal>;
  findById(id: string): Promise<Animal | null>;
  update(id: string, data: Prisma.AnimalUncheckedUpdateInput): Promise<Animal>;
  delete(id: string): Promise<void>;
}
