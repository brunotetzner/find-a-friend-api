import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateUseCase } from "../uc-authenticate/authenticate";

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgRepository();
  const authenticateUseCase = new AuthenticateUseCase(orgsRepository);
  return authenticateUseCase;
}
