import { SignJWT } from "npm:jose";

const accessSecret = Deno.env.get("JWT_ACCESS_SECRET");
const refreshSecret = Deno.env.get("JWT_REFRESH_SECRET");

export interface TokenGeneration {
  generateRefreshAccess: (
    payload: Record<string, string>
  ) => Promise<{ accessToken: string; refreshToken: string }>;
  verify: () => void;
}

export class TokenService implements TokenGeneration {
  constructor() {}

  async generateRefreshAccess(
    payload: Record<string, string>
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const encoder = new TextEncoder();
    const encodedAccessSecret = encoder.encode(accessSecret);
    const encodedRefreshSecret = encoder.encode(refreshSecret);
    const signer = new SignJWT(payload);

    const accessToken = await signer
      .setExpirationTime("2m")
      .setProtectedHeader({ alg: "HS256" })
      .sign(encodedAccessSecret);
    const refreshToken = await signer
      .setExpirationTime("5m")
      .setProtectedHeader({ alg: "HS256" })
      .sign(encodedRefreshSecret);

    return { accessToken, refreshToken };
  }

  verify() {} // TODO
}
