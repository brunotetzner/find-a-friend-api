import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgRepository implements OrgsRepository {
  public items: Org[] = [];

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

  async findById(id: string): Promise<Org | null> {
    const Org = this.items.find((item) => item.id === id);
    return Org || null;
  }

  async update(id: string, data: Prisma.OrgUncheckedUpdateInput): Promise<Org> {
    const orgIndex = this.items.findIndex((item) => item.id === id);

    const existingOrg = { ...this.items[orgIndex] };
    const updatedOrg = Object.assign(existingOrg, data);
    this.items[orgIndex] = updatedOrg;

    return updatedOrg;
  }

  async delete(id: string): Promise<void> {
    const orgIndex = this.items.findIndex((item) => item.id === id);
    await this.items.splice(orgIndex, 1)[0];
  }
}
