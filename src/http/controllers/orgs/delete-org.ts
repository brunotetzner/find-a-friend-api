import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteOrgUseCase } from "@/use-cases/factories/orgs/make-delete-org-use-case";

export async function deleteOrg(request: FastifyRequest, reply: FastifyReply) {
  const id = request.user.sign.sub;
  const deleteOrgUseCase = makeDeleteOrgUseCase();
  await deleteOrgUseCase.execute(id);
  reply.status(204).send();
}
