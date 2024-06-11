import { FormData } from "../models/auth";
import { ApiError } from "../errors";

const BASE_URL = "http://localhost:8082";
export const USER_ID_KEY = "fsp:user:id";
export const USER_TOKEN_KEY = "fsp:user:token";
export const ERRORS = {
  UNAUTHENTICATED: 401,
};

export const PATH = {
  SIGN_UP: "/sign-up",
  SIGN_IN: "/sign-in",
};

export const getPosts = async (token: string | null) => {
  return fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    const result = await response.json(); // TODO: parse data with zod

    switch (response.status) {
      case 200: {
        return result;
      }
      case ERRORS.UNAUTHENTICATED:
        throw new ApiError(result.message, response.status);
    }
  });
};

export const submitFormHandler = (
  data: FormData,
  path: string
): Promise<{ success: boolean }> =>
  fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    const result = await response.json()
    switch (response.status) {
      case 200:
        return { success: true };
      case 201:
        const { userId, jwt } = result; // TODO: create scheme and parse with zod.

        localStorage.setItem(USER_ID_KEY, userId);
        localStorage.setItem(USER_TOKEN_KEY, jwt);

        return { success: true };
      case 400:
        throw new ApiError(result.message, response.status)
      default:
        return { success: false };
    }
  });
