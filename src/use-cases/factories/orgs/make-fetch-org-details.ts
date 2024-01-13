import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { FetchOrgDetailsUseCase } from "../../uc-orgs/fetch-org-details";

export function makeFetchOrgDetailsUseCase() {
  const OrgsRepository = new PrismaOrgsRepository();

  const useCase = new FetchOrgDetailsUseCase(OrgsRepository);

  return useCase;
}
