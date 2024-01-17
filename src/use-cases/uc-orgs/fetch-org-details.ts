import { OrgsRepository } from "@/repositories/orgs-repository";
import { OrgNotFoundError } from "../errors/org-not-found";
import { orgResponse } from "@/dtos/org.dto";

interface FetchOrgDetailsUseCaseRequest {
  orgId: string;
}

export class FetchOrgDetailsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: FetchOrgDetailsUseCaseRequest): Promise<orgResponse> {
    const org = await this.orgsRepository.findById(orgId);
    if (!org) {
      throw new OrgNotFoundError();
    }
    return {
      id: org.id,
      name: org.name,
      email: org.email,
      phone: org.phone,
      description: org.description,
      created_at: org.created_at,
      updated_at: org.updated_at,
      addressId: org.addressId,
    };
  }
}
