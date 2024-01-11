import { Prisma, Animal } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { AnimalsRepository } from "../animals-repository";

export class InMemoryAnimalsRepository implements AnimalsRepository {
  public items: Animal[] = [];

  async create(data: Prisma.AnimalUncheckedCreateInput): Promise<Animal> {
    const animal = {
      id: randomUUID(),
      name: data.name,
      type: data.type,
      age: data.age,
      weight: data.weight,
      temperament: data.temperament,
      addressId: data.addressId,
      orgId: data.orgId,
      description: data.description,
      breed: data.breed || null,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.items.push(animal);
    return animal;
  }

  async findById(id: string): Promise<Animal | null> {
    const animal = this.items.find((item) => item.id === id);
    return animal || null;
  }

  async update(
    id: string,
    data: Prisma.AnimalUncheckedUpdateInput
  ): Promise<Animal> {
    const animalIndex = this.items.findIndex((item) => item.id === id);

    const existingAnimal = { ...this.items[animalIndex] };
    const updatedAnimal = Object.assign(existingAnimal, data);
    this.items[animalIndex] = updatedAnimal;

    return updatedAnimal;
  }

  async delete(id: string): Promise<void> {
    const animalIndex = this.items.findIndex((item) => item.id === id);
    await this.items.splice(animalIndex, 1)[0];
  }

  async findMany({
    city,
    type,
    age,
    weight,
    temperament,
    breed,
    orgId,
    page = 1,
    pageSize = 10,
  }: {
    city: string;
    type?: string;
    age?: number;
    weight?: number;
    temperament?: string;
    breed?: string;
    orgId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Animal[]> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const filteredAnimals = this.items.filter((animal) => {
      return (
        (!city || animal.addressId === city) &&
        (!type || animal.type === type) &&
        (!age || animal.age === age) &&
        (!weight || animal.weight === weight) &&
        (!temperament || animal.temperament === temperament) &&
        (!breed || animal.breed === breed) &&
        (!orgId || animal.orgId === orgId)
      );
    });

    return filteredAnimals.slice(startIndex, endIndex);
  }
}
