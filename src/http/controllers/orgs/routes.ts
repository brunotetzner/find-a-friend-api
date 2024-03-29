import { FastifyInstance } from "fastify";

import { register } from "./register";
import { authenticate } from "./authenticate";
import { fetchOrgDetails } from "./fetch-org-details";
import { verifyJWT } from "@/http/middlewares/verifiy-jwt";
import { deleteOrg } from "./delete-org";
import { updateOrg } from "./update-org";
import { redirectToWhatsappOrg } from "./whatsapp";

export async function OrgRoutes(app: FastifyInstance) {
  app.post("/org", register);
  app.post("/org/authenticate", authenticate);
  app.get("/org/me", { onRequest: [verifyJWT] }, fetchOrgDetails);
  app.delete("/org", { onRequest: [verifyJWT] }, deleteOrg);
  app.patch("/org", { onRequest: [verifyJWT] }, updateOrg);
  app.get("/org/:id/whatsapp", redirectToWhatsappOrg);
}
