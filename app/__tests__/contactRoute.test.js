const request = require("supertest");
const app = require("../index.cjs");
const sendEmailToAdmin = require("../helpers/sendEmailToAdmin");

jest.mock("../helpers/sendEmailToAdmin");

describe("Contact form submit validation", () => {
  it("should handle contact form submission without validation errors", async () => {
    const data = {
      name: "John Doe",
      email: "john.doe@example.com",
      message: "This is a valid message",
    };
    const response = await request(app).post("/send").send(data);

    expect(response.status).toBe(200);
    expect(response.text).toContain("Uw bericht werd correct verzonden!");
    expect(sendEmailToAdmin).toHaveBeenCalledWith(data);
  });
  it("should handle contact form submission with validation error for name", async () => {
    const data = {
      name: "  ",
      email: "john.doe@example.com",
      message: "This is an invalid message",
    };
    const response = await request(app).post("/send").send(data);

    expect(response.text).toContain(
      `De ingevoerde data is ongeldig en kan niet worden aanvaard door de server. Probeer het opnieuw.`
    );
  });
  it("should handle contact form submission with validation error for message", async () => {
    const data = {
      name: "John Doe",
      email: "john.doe@example.com",
      message: "",
    };
    const response = await request(app).post("/send").send(data);

    expect(response.text).toContain(
      `De ingevoerde data is ongeldig en kan niet worden aanvaard door de server. Probeer het opnieuw.`
    );
  });
  it("should handle contact form submission with validation error for email", async () => {
    const data = {
      name: "John Doe",
      email: "invalid -- email",
      message: "This is a valid message",
    };
    const response = await request(app).post("/send").send(data);

    expect(response.text).toContain(
      `De ingevoerde data is ongeldig en kan niet worden aanvaard door de server. Probeer het opnieuw.`
    );
  });
});
