import { AnimalType, AnimalTemperament } from "@prisma/client";
import { RequestParams } from "./interfaces";

export interface AnimalsResquestParam extends RequestParams {
  city: string;
  type?: AnimalType;
  age?: number;
  weight?: number;
  temperament?: AnimalTemperament;
  breed?: string;
  orgId?: string;
}
