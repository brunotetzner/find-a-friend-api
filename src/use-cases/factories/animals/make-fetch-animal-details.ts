import { PrismaAnimalsRepository } from "@/repositories/prisma/prisma-animals-repository";
import { FetchAnimalsDetailsUseCase } from "@/use-cases/uc-animals/fetch-animal-details";

export function makeFetchAnimalDetailsUseCase() {
  const animalsRepository = new PrismaAnimalsRepository();

  const useCase = new FetchAnimalsDetailsUseCase(animalsRepository);

  return useCase;
}
