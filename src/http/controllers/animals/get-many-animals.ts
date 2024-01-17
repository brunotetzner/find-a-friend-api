import { makeGetManyAnimalsUseCase } from "@/use-cases/factories/animals/make-get-many-animals-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AnimalTemperament, AnimalType } from "@prisma/client";
import { OrgNotFoundError } from "@/use-cases/errors/org-not-found";
import { ListAnimalsResquestParams } from "@/dtos/animal.dto";
import { OrderResponseBy } from "@/enumerators/shared-enums";

export async function getManyAnimals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const reqParams = request.query;

  const animalsRequestDataSchema = z.object({
    city: z.string().refine((data) => data.trim() !== ""),
    type: z.nativeEnum(AnimalType).optional(),
    maxAge: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined)),
    minAge: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined)),
    weight: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined)),
    temperament: z.nativeEnum(AnimalTemperament).optional(),
    breed: z.string().optional(),
    orgId: z.string().optional(),
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined)),
    pageSize: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined)),
    created_at: z
      .string()
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),
    orderBy: z.nativeEnum(OrderResponseBy).optional(),
  });

  const requestData: ListAnimalsResquestParams =
    animalsRequestDataSchema.parse(reqParams);

  try {
    const getManyAnimalsUseCase = makeGetManyAnimalsUseCase();
    const animalsResponse = await getManyAnimalsUseCase.execute(requestData);
    return reply.send(animalsResponse);
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
