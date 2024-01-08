import { FastifyInstance } from "fastify";

import { register } from "./register";

export async function OrgRoutes(app: FastifyInstance) {
  app.post("/org", register);
}
