import { AnimalsRepository } from "@/repositories/animals-repository";
import { AnimalTemperament, AnimalType } from "@prisma/client";

interface updateAnimalUseCaseRequest {
  name?: string;
  type?: AnimalType;
  age?: number;
  weight?: number;
  temperament?: AnimalTemperament;
  description?: string;
}

export class UpdateAnimalUseCase {
  constructor(private animalsRepository: AnimalsRepository) {}
  async execute(id: string, body: updateAnimalUseCaseRequest): Promise<void> {
    await this.animalsRepository.update(id, body);
  }
}
