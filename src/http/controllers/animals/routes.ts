import { FastifyInstance } from "fastify";

import { getManyAnimals } from "./get-many-animals";
import { register } from "./register";
import { verifyJWT } from "@/http/middlewares/verifiy-jwt";

export async function AnimalRoutes(app: FastifyInstance) {
  app.get("/animal/list", { onRequest: [verifyJWT]}, getManyAnimals);
  app.post("/animal", { onRequest: [verifyJWT]},register);
}
