import { app } from "@/app";
import request from "supertest";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";

describe("Update org (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update an org", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const response = await request(app.server)
      .patch("/org")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Centro de adoção de teste" });
    expect(response.status).toBe(204);
  });

  it("should not be able update an org if is not authenticated", async () => {
    const response = await request(app.server)
      .patch("/org")
      .send({ name: "Centro de adoção de teste" });
    expect(response.status).toBe(401);
  });
});
