import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgRepository implements OrgsRepository {
  public items: Org[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const Org = {
      id: randomUUID(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      password_hash: data.password_hash,
      addressId: data.addressId,
      description: data.description,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.items.push(Org);
    return Org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const Org = this.items.find((item) => item.email === email);
    return Org || null;
  }
}
