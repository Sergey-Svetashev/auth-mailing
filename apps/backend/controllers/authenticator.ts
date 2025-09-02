import { Context, Next } from "oak/mod.ts";
import { Status } from "oak_commons/status.ts";
import { AuthService } from "../models/auth.ts";
import { TokenService } from "../models/token.ts";
import { db } from "../utils/db.ts";

const tokenService = new TokenService();
const authService = new AuthService(db, tokenService);

export const signUp = async ({ request, response }: Context, next: Next) => {
  const { email, password } = await request.body.json();
  const user = await authService.signUp(email, password);

  response.status === Status.OK;
  response.body = JSON.stringify(user);

  return next();
};

export const signIn = async ({ request, response }: Context, next: Next) => {
  const { email, password } = await request.body.json();
  const { user, accessToken, refreshToken } = await authService.signIn(
    email,
    password
  );

  console.log("accessToken at the controller", accessToken);

  response.status === Status.OK;
  response.headers.set("Set-Cookie", refreshToken);
  response.body = JSON.stringify(user);

  return next();
};

// const sessionCookie = request.headers
//       .get("Cookie")
//       ?.split("; ")
//       .find((e) => e === "session_id");
