import { app } from "@/app";
import request from "supertest";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";

describe("Org details (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get org details", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const response = await request(app.server)
      .get("/org/me")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.org).toHaveProperty("id");
  });

  it("should not get org details if is not authenticated", async () => {
    const response = await request(app.server).get("/org/me");
    expect(response.status).toBe(401);
  });
});
