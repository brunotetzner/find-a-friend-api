import { makeGetManyAnimalsUseCase } from "@/use-cases/factories/animals/make-get-many-animals";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AnimalsResquestParam } from "@/interfaces/animals-interfaces";
import { AnimalTemperament, AnimalType } from "@prisma/client";
import { OrgNotFoundError } from "@/use-cases/errors/org-not-found";

export async function getManyAnimals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const reqParams = request.query as AnimalsResquestParam;

  enum OrderBy {
    ASC = "asc",
    DESC = "desc",
  }
  const animalsRequestDataSchema = z.object({
    city: z.string(),
    type: z.nativeEnum(AnimalType).optional(),
    maxAge: z.string().optional(),
    minAge: z.string().optional(),
    weight: z.number().optional(),
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
    created_at: z.string().optional(),
    orderBy: z.nativeEnum(OrderBy).optional(),
  });

  const requestData = animalsRequestDataSchema.parse(reqParams);

  const requestDataToSend = {
    ...requestData,
    page: requestData.page && Number(requestData.page),
    pageSize: requestData.pageSize && Number(requestData.pageSize),
    minAge: requestData.minAge && Number(requestData.minAge),
    maxAge: requestData.maxAge && Number(requestData.maxAge),
  };

  try {
    const getManyAnimalsUseCase = makeGetManyAnimalsUseCase();
    const animalsResponse = await getManyAnimalsUseCase.execute(
      requestDataToSend
    );
    return reply.send(animalsResponse);
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
