import { AnimalsRepository } from "@/repositories/animals-repository";
import { Animal } from "@prisma/client";
import { AnimalNotFoundError } from "../errors/animal-not-found";

interface FetchAnimalDetailsUseCaseRequest {
  animalId: string;
}

interface FetchAnimalDetailsUseCaseResponse {
  animal: Animal;
}

export class FetchAnimalsDetailsUseCase {
  constructor(private animalsRepository: AnimalsRepository) {}

  async execute({
    animalId,
  }: FetchAnimalDetailsUseCaseRequest): Promise<FetchAnimalDetailsUseCaseResponse> {
    const animal = await this.animalsRepository.findById(animalId);

    if (!animal) {
      throw new AnimalNotFoundError();
    }
    return { animal };
  }
}
