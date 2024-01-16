import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteAnimalUseCase } from "@/use-cases/factories/animals/make-delete-animal-use-case";

export async function deleteAnimal(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const orgId = request.user.sign.sub;

  const deleteAnimalUseCase = makeDeleteAnimalUseCase();
  await deleteAnimalUseCase.execute(orgId, id);
  return reply.status(204).send();
}
