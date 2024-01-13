import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { UpdateOrgUseCase } from "../../uc-orgs/update-org";

export function makeUpdateOrgUseCase() {
  const OrgsRepository = new PrismaOrgsRepository();

  const useCase = new UpdateOrgUseCase(OrgsRepository);

  return useCase;
}
