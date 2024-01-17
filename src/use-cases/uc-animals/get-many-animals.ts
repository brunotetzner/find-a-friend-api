import { OrgsRepository } from "@/repositories/orgs-repository";
import { AnimalsRepository } from "@/repositories/animals-repository";
import { OrgNotFoundError } from "../errors/org-not-found";
import { CityIsRequiredError } from "../errors/city-is-required-error";
import {
  GetManyAnimalsResponse,
  ListAnimalsResquestParams,
} from "@/dtos/animal.dto";

export class GetManyAnimalsUseCase {
  constructor(
    private animalsRepository: AnimalsRepository,
    private orgsRepository: OrgsRepository
  ) {}
  async execute(
    params: ListAnimalsResquestParams
  ): Promise<GetManyAnimalsResponse> {
    const org =
      params.orgId && (await this.orgsRepository.findById(params.orgId));

    if (params.orgId && !org) {
      throw new OrgNotFoundError();
    }
    if (!params.city) {
      throw new CityIsRequiredError();
    }
    const animals = await this.animalsRepository.findMany(params);

    return animals;
  }
}
