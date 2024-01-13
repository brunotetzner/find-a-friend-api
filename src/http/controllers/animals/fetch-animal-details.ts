import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAnimalDetailsUseCase } from "@/use-cases/factories/animals/make-fetch-animal-details-use-case";
import { AnimalNotFoundError } from "@/use-cases/errors/animal-not-found";

export async function fetchAnimalDetails(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  try {
    const fetchAnimalDetailsUseCase = makeFetchAnimalDetailsUseCase();
    const animalsResponse = await fetchAnimalDetailsUseCase.execute({
      animalId: id,
    });
    return reply.send(animalsResponse);
  } catch (err) {
    if (err instanceof AnimalNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
