import { AnimalType, AnimalTemperament, Animal } from "@prisma/client";
import { CreateAddressBody } from "./address.dto";

export interface ListAnimalsResquestParams {
  city: string;
  type?: AnimalType;
  minAge?: number;
  maxAge?: number;
  weight?: number;
  temperament?: AnimalTemperament;
  breed?: string;
  orgId?: string;
  page?: number;
  pageSize?: number;
  created_at?: Date;
}

export interface GetManyAnimalsResponse {
  animals: Animal[];
  totalPages: number;
  totalAnimals: number;
}

export interface CreateAnimalBody {
  id: string;
  name: string;
  type: AnimalType;
  age: number;
  weight: number;
  temperament: AnimalTemperament;
  description: string;
  breed?: string;
}

export interface CreateAnimalBodyRequest extends CreateAnimalBody {
  address: CreateAddressBody;
}
