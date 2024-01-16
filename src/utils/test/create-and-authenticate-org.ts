import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrg(
  app: FastifyInstance
): Promise<{ token: string; orgId: string }> {
  const address = await prisma.address.create({
    data: {
      zipCode: "13836242",
      street: "Rua Exemplo, 123",
      city: "Cidade Exemplo",
      state: "SP",
      country: "País Exemplo",
      addressNumber: "12",
    },
  });
  const org = await prisma.org.create({
    data: {
      name: "Jon Doe",
      phone: "+5519999890165",
      email: "jondoe@example.com",
      password_hash: await hash("123456", 6),
      description: "teste12345",
      addressId: address.id,
    },
  });

  const AuthResponse = await request(app.server)
    .post("/org/authenticate")
    .send({
      email: "jondoe@example.com",
      password: "123456",
    });
  const { token } = AuthResponse.body;
  return { token, orgId: org.id };
}
