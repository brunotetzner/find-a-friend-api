import { OrgsRepository } from "@/repositories/orgs-repository";
import { Animal, AnimalTemperament, AnimalType } from "@prisma/client";
import { AnimalsRepository } from "@/repositories/animals-repository";
import { OrgNotFoundError } from "../errors/org-not-found";

interface GetManyAnimalsParamsRequest {
  city: string;
  type?: AnimalType;
  age?: number;
  weight?: number;
  temperament?: AnimalTemperament;
  breed?: string;
  orgId?: string;
  page?: number;
  pageSize?: number;
}

interface GetManyAnimalsUseCaseResponse {
  animals: Animal[];
}
export class GetManyAnimalsUseCase {
  constructor(
    private animalsRepository: AnimalsRepository,
    private orgsRepository: OrgsRepository
  ) {}
  async execute(
    params: GetManyAnimalsParamsRequest
  ): Promise<GetManyAnimalsUseCaseResponse> {
    const org =
      params.orgId && (await this.orgsRepository.findById(params.orgId));

    if (params.orgId && !org) {
      throw new OrgNotFoundError();
    }

    const animals = await this.animalsRepository.findMany(params);

    return { animals };
  }
}
