import { makeGetManyAnimalsUseCase } from "@/use-cases/factories/animals/make-get-many-animals";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AnimalsResquestParam } from "@/interfaces/animals-interfaces";
import { AnimalTemperament, AnimalType } from "@prisma/client";

export async function getManyAnimals(request: FastifyRequest, reply: FastifyReply) {
  const reqParams = request.query as AnimalsResquestParam;

  const animalsRequestDataSchema = z.object({
    city: z.string(),
    type: z.nativeEnum(AnimalType).optional(),
    maxAge: z.string().optional(),
    minAge: z.string().optional(),
    weight: z.number().optional(),
    temperament: z.nativeEnum(AnimalTemperament).optional(),
    breed: z.string().optional(),
    orgId: z.string().optional(),
    page: z.string().optional().transform(val => val ? parseInt(val) : undefined),
    pageSize: z.string().optional().transform(val => val ? parseInt(val) : undefined),
    created_at: z.string().optional(),
  });

  const requestData = animalsRequestDataSchema.parse(reqParams);

  const requestDataToSend = {
    ...requestData,
    page: requestData.page && Number(requestData.page),
    pageSize: requestData.pageSize && Number(requestData.pageSize),
    minAge: requestData.minAge && Number(requestData.minAge),
    maxAge: requestData.maxAge && Number(requestData.maxAge),
  };

  // eslint-disable-next-line no-useless-catch
  try {
    const getManyAnimalsUseCase = makeGetManyAnimalsUseCase();
    const animalsResponse = await getManyAnimalsUseCase.execute(requestDataToSend);
    return reply.send(animalsResponse);
  } catch (err) {
    throw err;
  }
}
