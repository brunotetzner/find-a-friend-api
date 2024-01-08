import { Prisma, Org } from "@prisma/client";
import { AddressRepository } from "../address-repository";

export class InMemoryAddressRepository implements AddressRepository {
  public items: Org[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    // const Org = {
    //   id: randomUUID(),
    //   user_id: data.user_id,
    //   gym_id: data.gym_id,
    //   validated_at: data.validated_at ? new Date(data.validated_at) : null,
    //   created_at: new Date(),
    // };
    // this.items.push(Org);
    // return Org;
    return Promise.resolve({} as Org);
  }
}
