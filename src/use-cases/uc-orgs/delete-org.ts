import { OrgsRepository } from "@/repositories/orgs-repository";

export class DeleteOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}
  async execute(id: string): Promise<void> {
    await this.orgsRepository.delete(id);
  }
}
