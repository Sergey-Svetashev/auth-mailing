import * as bcrypt from "bcrypt";
import * as jose from "jose";
import { Context } from "oak/mod.ts";
import { ApiError } from "../models/errors.ts";
import { User } from "../models/user.ts";

export const signUp = async ({ request, response }: Context) => {
  const { name, email, password } = await request.body.json();
  const user = await User.getUser(email);

  if (user) {
    throw new ApiError("User with this Email exist.", 500); // TODO: select more appropriate code.
  } else {
    const encryptedPassword = await bcrypt.hash(password);
    const newUser = new User(name, email, encryptedPassword);

    await newUser.save();

    response.status = 200;
    response.body = JSON.stringify({
      message: `User ${newUser.name} with ${newUser.email} email created`,
    });
  }
};

export const signIn = async ({ request, response }: Context) => {
  const { email, password } = await request.body.json();
  const user = await User.getUser(email);

  if (!user) {
    throw new ApiError("User with this Email does not exist.", 400); // TODO: select more appropriate code.
  } else {
    const isCorrect = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      const secret = new TextEncoder().encode("Secret pass phrase."); // TODO: come up with a more reliable secret.
      const jwt = await new jose.SignJWT({
        email: user.email,
        id: user._id.toString(),
      })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime("1h")
        .sign(secret);

      response.status = 201;
      response.body = JSON.stringify({ userId: user._id.toString(), jwt });
    } else {
      throw new ApiError("Incorrect password!", 500); // TODO: select more appropriate code.
    }
  }
};
