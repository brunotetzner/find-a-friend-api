import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterUseCase } from "../../uc-orgs/register";

export function makeRegisterOrgUseCase() {
  const OrgsRepository = new PrismaOrgsRepository();

  const useCase = new RegisterUseCase(OrgsRepository);

  return useCase;
}
