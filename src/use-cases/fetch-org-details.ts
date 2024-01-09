import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { OrgNotFoundError } from "./errors/org-not-found";

interface FetchOrgDetailsUseCaseRequest {
  orgId: string;
}

interface FetchOrgDetailsUseCaseResponse {
  org: Org;
}

export class FetchOrgDetailsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: FetchOrgDetailsUseCaseRequest): Promise<FetchOrgDetailsUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) {
      throw new OrgNotFoundError();
    }
    return { org };
  }
}
