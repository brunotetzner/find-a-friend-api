import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists";
import { ViaCepNotFoundError } from "@/use-cases/errors/via-cep-not-found";
import { makeDeleteAddressUseCase } from "@/use-cases/factories/address/make-delete-address-use-case";
import { makeRegisterAddressUseCase } from "@/use-cases/factories/address/make-register-address-use-case";
import { makeRegisterOrgUseCase } from "@/use-cases/factories/orgs/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Address } from "@prisma/client";
import { CreateOrgBodyRequest } from "@/dtos/org.dto";

export async function register(
  request: FastifyRequest<{ Body: CreateOrgBodyRequest }>,
  reply: FastifyReply
) {
  const orgDataBodySchema = z.object({
    name: z.string().min(3).max(255),
    phone: z.string().min(14).max(14),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    description: z.string().min(6).max(1000),
  });

  const orgAddressBodySchema = z.object({
    zipCode: z.string().min(8).max(8),
    street: z.string().optional().default(""),
    city: z.string().optional().default(""),
    state: z.string().max(2).min(2).optional().default(""),
    country: z.string().default(""),
    addressNumber: z.string().default(""),
  });

  const orgData = orgDataBodySchema.parse(request.body);
  const orgAddressData = orgAddressBodySchema.parse(request?.body?.address);

  let createdAddress: Address | undefined;

  try {
    const registerUseCase = makeRegisterOrgUseCase();
    const registerAddressUseCase = makeRegisterAddressUseCase();

    const { address } = await registerAddressUseCase.execute(orgAddressData);
    createdAddress = address;
    await registerUseCase.execute({ ...orgData, addressId: address.id });
  } catch (err) {
    const deleteAddressUseCase = makeDeleteAddressUseCase();

    if (createdAddress) {
      await deleteAddressUseCase.execute(createdAddress.id);
    }

    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    if (err instanceof ViaCepNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
