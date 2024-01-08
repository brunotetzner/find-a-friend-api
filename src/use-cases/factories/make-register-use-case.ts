import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
  const OrgsRepository = new PrismaOrgRepository();

  const useCase = new RegisterUseCase(OrgsRepository);

  return useCase;
}
