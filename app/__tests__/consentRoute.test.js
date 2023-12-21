const request = require("supertest");
const app = require("../index.cjs");

describe("POST /consent", () => {
  test("should set ageConsent cookie and redirect to '/' when age is valid", async () => {
    const response = await request(app)
      .post("/consent")
      .send({ day: 1, month: 1, year: 1990 }); // Valid date

    expect(response.statusCode).toBe(302);
    expect(response.headers["set-cookie"]).toBeDefined();
    expect(response.headers["set-cookie"][0]).toMatch(/ageConsent=true/);
  });

  test("should render index with error message when age is not valid", async () => {
    const response = await request(app)
      .post("/consent")
      .send({ day: 1, month: 1, year: 2023 }); //invalid date

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Oeps! Geen geldige geboortedatum");
    expect(response.text).toContain("modal--show");
  });
});
