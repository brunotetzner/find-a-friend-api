import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateOrgUseCase } from "@/use-cases/factories/orgs/make-update-org-use-case";

export async function updateOrg(request: FastifyRequest, reply: FastifyReply) {
  const id = request.user.sign.sub;

  const orgDataBodySchema = z.object({
    name: z.string().min(3).max(255).optional(),
    phone: z.string().min(14).max(14).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).max(255).optional(),
    description: z.string().min(6).max(1000).optional(),
  });

  const orgData = orgDataBodySchema.parse(request.body);

  const updateOrgUseCase = makeUpdateOrgUseCase();
  await updateOrgUseCase.execute(id, orgData);

  return reply.status(204).send();
}
