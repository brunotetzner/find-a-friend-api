import { PrismaAnimalsRepository } from "@/repositories/prisma/prisma-animals-repository";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterAnimalUseCase } from "../../uc-animals/register";

export function makeRegisterUseCase() {
  const animalsRepository = new PrismaAnimalsRepository();
  const orgsRepository = new PrismaOrgsRepository();
  const useCase = new RegisterAnimalUseCase(animalsRepository, orgsRepository);

  return useCase;
}
