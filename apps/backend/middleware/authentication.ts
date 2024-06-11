import * as jose from "jose";
import { RouteParams, RouterContext } from "oak/mod.ts";
import { ApiError } from "../models/errors.ts";

export type StatefulAuthContext = RouterContext<
  string,
  RouteParams<string>,
  { userId: string }
>;

export const authentication = async (
  { request, state }: StatefulAuthContext,
  next: () => Promise<unknown>
) => {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    const error = new ApiError("No authentication header.", 401);
    throw error;
  }

  try {
    const token = authHeader.split(" ")[1];
    const secret = new TextEncoder().encode("Secret pass phrase.");
    const { payload } = await jose.jwtVerify(token, secret);

    state.userId = payload.id;

    next();
  } catch (cause) {
    const error = new ApiError(
      "Not authenticated error.",
      cause.statusCode || 401,
      cause
    );
    throw error;
  }
};
