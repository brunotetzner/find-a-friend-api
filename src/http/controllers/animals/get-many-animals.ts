import { makeGetManyAnimalsUseCase } from "@/use-cases/factories/animals/make-get-many-animals";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AnimalsResquestParam } from "@/interfaces/animals-interfaces";

export async function getManyAnimals(
  request: FastifyRequest<{ Params: AnimalsResquestParam }>,
  reply: FastifyReply
) {
  const animalsRequestDataSchema = z.object({
    type: z.string().optional(),
    age: z.string().optional(),
    weight: z.string().optional(),
    temperament: z.string().optional(),
    breed: z.string().optional(),
    orgId: z.string().optional(),
    page: z.string().optional(),
    pageSize: z.string().optional(),
    created_at: z.string().optional(),
  });

  const requestData = animalsRequestDataSchema.parse(request.params);

  // eslint-disable-next-line no-useless-catch
  try {
    const getManyAnimals = makeGetManyAnimalsUseCase(requestData);
  } catch (err) {
    throw err;
  }

  return reply.status(201).send();
}
