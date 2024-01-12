import { OrgsRepository } from "@/repositories/orgs-repository";
import { Animal, AnimalTemperament, AnimalType } from "@prisma/client";
import { AnimalsRepository } from "@/repositories/animals-repository";
import { OrgNotFoundError } from "../errors/org-not-found";

interface RegisterAnimalUseCaseRequest {
  type: AnimalType;
  name: string;
  age: number;
  weight: number;
  temperament: AnimalTemperament;
  breed: string;
  description: string;
  addressId: string;
  orgId: string;
}

interface RegisterAnimalUseCaseResponse {
  animal: Animal;
}
export class RegisterAnimalUseCase {
  constructor(
    private animalsRepository: AnimalsRepository,
    private orgsRepository: OrgsRepository
  ) {}
  async execute(
    body: RegisterAnimalUseCaseRequest
  ): Promise<RegisterAnimalUseCaseResponse> {
    const org = await this.orgsRepository.findById(body.orgId);
    if (!org) {
      throw new OrgNotFoundError();
    }

    const animalData = {
      name: body.name,
      type: body.type,
      age: body.age,
      weight: body.weight,
      breed: body.breed,
      temperament: body.temperament,
      addressId: body.addressId,
      orgId: body.orgId,
      description: body.description,
    };

    const animal = await this.animalsRepository.create(animalData);

    return { animal };
  }
}
