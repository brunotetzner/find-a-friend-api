import { OrgsRepository } from "@/repositories/orgs-repository";

interface updateOrgUseCaseRequest {
  name?: string;
  phone?: string;
  email?: string;
  description?: string;
}

export class UpdateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}
  async execute(id: string, body: updateOrgUseCaseRequest): Promise<void> {
    await this.orgsRepository.update(id, body);
  }
}
