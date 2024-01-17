import { ViaCepNotFoundError } from "@/use-cases/errors/via-cep-not-found";
import { makeDeleteAddressUseCase } from "@/use-cases/factories/address/make-delete-address-use-case";
import { makeRegisterAddressUseCase } from "@/use-cases/factories/address/make-register-address-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Address, AnimalTemperament, AnimalType } from "@prisma/client";
import { makeRegisterAnimalUseCase } from "@/use-cases/factories/animals/make-register-use-case";
import { OrgNotFoundError } from "@/use-cases/errors/org-not-found";
import { CreateAnimalBodyRequest } from "@/dtos/animal.dto";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const orgId = request.user.sign.sub;

  const animalDataBodySchema = z.object({
    name: z.string().min(1).max(255),
    type: z.nativeEnum(AnimalType),
    age: z.number(),
    weight: z.number(),
    temperament: z.nativeEnum(AnimalTemperament),
    description: z.string(),
    breed: z.string().optional(),
  });

  const animalAddressBodySchema = z.object({
    zipCode: z.string().min(8).max(8),
    street: z.string().optional().default(""),
    city: z.string().optional().default(""),
    state: z.string().max(2).min(2).optional().default(""),
    country: z.string().default(""),
    addressNumber: z.string().default(""),
  });

  const reqBody = request.body as CreateAnimalBodyRequest;
  const animalData = animalDataBodySchema.parse(reqBody);
  const animalAddressData = animalAddressBodySchema.parse(reqBody.address);

  let createdAddress: Address | undefined;

  try {
    const registerUseCase = makeRegisterAnimalUseCase();
    const registerAddressUseCase = makeRegisterAddressUseCase();

    const { address } = await registerAddressUseCase.execute(animalAddressData);
    createdAddress = address;
    await registerUseCase.execute({
      ...animalData,
      breed: animalData.breed || "",
      addressId: address.id,
      orgId,
    });
  } catch (err) {
    const deleteAddressUseCase = makeDeleteAddressUseCase();

    if (createdAddress) {
      await deleteAddressUseCase.execute(createdAddress.id);
    }

    if (err instanceof OrgNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    if (err instanceof ViaCepNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
