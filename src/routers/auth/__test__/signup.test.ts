import request from "supertest";
import { app } from "../../../app";

it("returns 201 on successful signup", async () => {
  return request(app)
    .post("/signup")
    .send({
      email: "test@test.com",
      password: "1234566",
    })
    .expect(201);
});

it("sets the cookie after successful signup", async () => {
  const res = await request(app)
    .post("/signup")
    .send({
      email: "test@test.com",
      password: "1234566",
    })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined();
});
