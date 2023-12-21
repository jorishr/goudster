const request = require("supertest");
const app = require("../index.cjs");

describe("Mailing List Signup Route", () => {
  it("should handle subscription with validation errors", async () => {
    const response = await request(app)
      .post("/subscribe")
      .send({ email: "invalid-email" });

    expect(response.status).toBe(422);
  });
});
