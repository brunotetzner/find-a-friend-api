import { FastifyInstance } from "fastify";

import { getManyAnimals } from "./get-many-animals";

export async function OrgRoutes(app: FastifyInstance) {
  app.post("/animal/list", getManyAnimals);
}
