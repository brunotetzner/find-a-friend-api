import { FastifyInstance } from "fastify";

import { getManyAnimals } from "./get-many-animals";
import { register } from "./register";
import { verifyJWT } from "@/http/middlewares/verifiy-jwt";
import { fetchAnimalDetails } from "./fetch-animal-details";

export async function AnimalRoutes(app: FastifyInstance) {
  app.get("/animal/list", getManyAnimals);
  app.get("/animal/:id", fetchAnimalDetails);
  app.post("/animal", { onRequest: [verifyJWT] }, register);
}
