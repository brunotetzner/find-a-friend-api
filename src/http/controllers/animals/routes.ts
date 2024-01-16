import { FastifyInstance } from "fastify";

import { getManyAnimals } from "./get-many-animals";
import { register } from "./register";
import { verifyJWT } from "@/http/middlewares/verifiy-jwt";
import { fetchAnimalDetails } from "./fetch-animal-details";
import { deleteAnimal } from "./delete-animal";
import { updateAnimal } from "./update-animal";

export async function AnimalRoutes(app: FastifyInstance) {
  app.get("/animal/list", getManyAnimals);
  app.get("/animal/:id", fetchAnimalDetails);
  app.post("/animal", { onRequest: [verifyJWT] }, register);
  app.delete("/animal/:id", { onRequest: [verifyJWT] }, deleteAnimal);
  app.patch("/animal/:id", { onRequest: [verifyJWT] }, updateAnimal);
}
