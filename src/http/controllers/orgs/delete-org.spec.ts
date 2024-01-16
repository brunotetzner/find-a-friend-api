import { app } from "@/app";
import request from "supertest";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";

describe("Delete org(e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete a org", async () => {
    const { token } = await createAndAuthenticateOrg(app);
    const response = await request(app.server)
      .delete("/org")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(204);
  });
  it("should not be able to delete a org if is not authenticated", async () => {
    const response = await request(app.server).delete("/org");
    expect(response.status).toBe(401);
  });
});
