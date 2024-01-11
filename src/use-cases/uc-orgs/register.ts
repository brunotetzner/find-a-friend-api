import { OrgsRepository } from "@/repositories/orgs-repository";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "../errors/org-already-exists";
import { Org } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
  addressId: string;
  description: string;
}

interface RegisterUseCaseResponse {
  org: Org;
}
export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}
  async execute(
    body: RegisterUseCaseRequest
  ): Promise<RegisterUseCaseResponse> {
    const orgWithTheSameEmail = await this.orgsRepository.findByEmail(
      body.email
    );
    if (orgWithTheSameEmail) {
      throw new OrgAlreadyExistsError();
    }
    const password_hash = await hash(body.password, 6);
    const orgData = {
      name: body.name,
      phone: body.phone,
      email: body.email,
      addressId: body.addressId,
      password_hash,
      description: body.description,
    };
    const org = await this.orgsRepository.create(orgData);

    return { org };
  }
}
