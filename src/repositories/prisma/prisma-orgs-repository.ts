import { OrgsRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";
import { Prisma, Org } from "@prisma/client";

export class PrismaOrgRepository implements OrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const Org = await prisma.org.create({ data });
    return Org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const Org = await prisma.org.findUnique({ where: { email } });
    return Org || null;
  }
}
