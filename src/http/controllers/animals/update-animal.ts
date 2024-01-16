import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateAnimalDetailsUseCase } from "@/use-cases/factories/animals/make-update-animal-use-case";
import { AnimalType, AnimalTemperament } from "@prisma/client";
import { z } from "zod";

export async function updateAnimal(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const orgId = request.user.sign.sub;

  const updateAnimalDataBodySchema = z.object({
    name: z.string().min(1).max(255).optional(),
    type: z.nativeEnum(AnimalType).optional(),
    age: z.number().optional(),
    weight: z.number().optional(),
    temperament: z.nativeEnum(AnimalTemperament).optional(),
    description: z.string().optional(),
    breed: z.string().optional().optional(),
  });

  const animalData = updateAnimalDataBodySchema.parse(request.body);

  const updateAnimalUseCase = makeUpdateAnimalDetailsUseCase();
  await updateAnimalUseCase.execute(id, orgId, animalData);
  return reply.status(204).send();
}
