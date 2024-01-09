import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterUseCase } from "../uc-org/register";

export function makeRegisterUseCase() {
  const OrgsRepository = new PrismaOrgRepository();

  const useCase = new RegisterUseCase(OrgsRepository);

  return useCase;
}
