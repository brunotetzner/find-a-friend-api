import fastifyJwt from "@fastify/jwt";
import { fastify } from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { OrgRoutes } from "./http/controllers/orgs/routes";
import fastifyCookie from "@fastify/cookie";
import { AnimalRoutes } from "./http/controllers/animals/routes";
export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});
app.register(fastifyCookie);
app.register(OrgRoutes);
app.register(AnimalRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply
      .status(400)
      .send({ message: "validation error", issue: error.format() });
    return;
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: log error to external service
  }

  reply.status(500).send({ message: "internal server error" });
});
