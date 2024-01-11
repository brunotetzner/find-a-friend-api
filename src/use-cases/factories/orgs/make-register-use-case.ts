import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterUseCase } from "../../uc-orgs/register";

export function makeRegisterUseCase() {
  const OrgsRepository = new PrismaOrgsRepository();

  const useCase = new RegisterUseCase(OrgsRepository);

  return useCase;
}
