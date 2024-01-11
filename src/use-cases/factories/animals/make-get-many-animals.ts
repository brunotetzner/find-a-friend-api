import { PrismaAnimalsRepository } from "@/repositories/prisma/prisma-animals-repository";
import { GetManyAnimalsUseCase } from "../../uc-animals/get-many-animals";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";

export function makeGetManyAnimalsUseCase() {
  const animalsRepository = new PrismaAnimalsRepository();
  const orgsRepository = new PrismaOrgsRepository();

  const useCase = new GetManyAnimalsUseCase(animalsRepository, orgsRepository);

  return useCase;
}
