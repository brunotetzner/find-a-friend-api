import { AnimalsRepository } from "@/repositories/animals-repository";

export class DeleteAnimalUseCase {
  constructor(private animalsRepository: AnimalsRepository) {}
  async execute(orgId: string, id: string): Promise<void> {
    await this.animalsRepository.delete(orgId, id);
  }
}
