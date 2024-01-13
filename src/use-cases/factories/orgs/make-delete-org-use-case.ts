import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { DeleteOrgUseCase } from "../../uc-orgs/delete-org";

export function makeDeleteOrgUseCase() {
  const OrgsRepository = new PrismaOrgsRepository();

  const useCase = new DeleteOrgUseCase(OrgsRepository);

  return useCase;
}
