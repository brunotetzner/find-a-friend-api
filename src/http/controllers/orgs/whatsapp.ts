import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchOrgDetailsUseCase } from "@/use-cases/factories/orgs/make-fetch-org-details";

export async function redirectToWhatsappOrg(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  const getOrgUseCase = makeFetchOrgDetailsUseCase();
  const org = await getOrgUseCase.execute({ orgId: id });

  const replacedPhone = org.phone.replace(/\+55/g, "");

  const link = `http://api.whatsapp.com/send?1=pt_BR&phone=${replacedPhone}`;
  reply.send({ link });
}
