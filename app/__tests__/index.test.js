const request = require("supertest");
const app = require("../index.cjs");

describe("Test Express GET Routes", () => {
  const routes = [
    { route: "/" },
    { route: "/ons-verhaal" },
    { route: "/waar-proeven" },
    { route: "/info" },
    { route: "/beleid" },
    { route: "/voorwaarden" },
    { route: "/contact" },
  ];

  test.each(routes)(
    `$route should respond with status 200 for GET requests`,
    async ({ route, description }) => {
      const server = app.listen();
      const response = await request(server).get(route);
      server.close();
      expect(response.statusCode).toBe(200);
    }
  );
});

describe("Test Express REDIRECT Routes", () => {
  const routes = [{ route: "/webmail" }];

  test.each(routes)(
    `$route should respond with status 302 for GET requests`,
    async ({ route, description }) => {
      const server = app.listen();
      const response = await request(server).get(route);
      server.close();
      expect(response.statusCode).toBe(302);
    }
  );
});
