import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchOrgDetailsUseCase } from "@/use-cases/factories/orgs/make-fetch-org-details";
import { OrgNotFoundError } from "@/use-cases/errors/org-not-found";

export async function fetchOrgDetails(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const id = request.user.sign.sub;
  try {
    const fetchOrgDetailsUseCase = makeFetchOrgDetailsUseCase();
    const orgResponse = await fetchOrgDetailsUseCase.execute({
      orgId: id,
    });
    return reply.send(orgResponse);
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
