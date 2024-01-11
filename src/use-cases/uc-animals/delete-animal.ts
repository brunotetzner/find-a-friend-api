import { AnimalsRepository } from "@/repositories/animals-repository";

export class DeleteAnimalUseCase {
  constructor(private animalsRepository: AnimalsRepository) {}
  async execute(id: string): Promise<void> {
    await this.animalsRepository.delete(id);
  }
}
