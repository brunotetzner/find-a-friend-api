import { PrismaAnimalsRepository } from "@/repositories/prisma/prisma-animals-repository";
import { UpdateAnimalUseCase } from "@/use-cases/uc-animals/update-animal";

export function makeUpdateAnimalDetailsUseCase() {
  const animalsRepository = new PrismaAnimalsRepository();

  const useCase = new UpdateAnimalUseCase(animalsRepository);

  return useCase;
}
