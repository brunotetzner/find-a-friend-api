import { PrismaAnimalsRepository } from "@/repositories/prisma/prisma-animals-repository";
import { DeleteAnimalUseCase } from "@/use-cases/uc-animals/delete-animal";

export function makeDeleteAnimalUseCase() {
  const animalsRepository = new PrismaAnimalsRepository();

  const useCase = new DeleteAnimalUseCase(animalsRepository);

  return useCase;
}
