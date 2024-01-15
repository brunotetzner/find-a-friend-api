import { OrgsRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";
import { Prisma, Org } from "@prisma/client";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const Org = await prisma.org.create({ data });
    return Org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const Org = await prisma.org.findUnique({ where: { email } });
    return Org || null;
  }

  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id: id,
      },
    });
    return org || null;
  }

  async update(id: string, data: Prisma.OrgUncheckedUpdateInput): Promise<Org> {
    const Org = await prisma.org.update({ where: { id }, data });
    return Org;
  }
  async delete(id: string): Promise<void> {
    await prisma.org.delete({ where: { id } });
  }
}
