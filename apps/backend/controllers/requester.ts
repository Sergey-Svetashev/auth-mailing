import { Context } from "oak/mod.ts";
import { GenericError } from "../models/errors.ts";
import { User } from "../models/user.ts";

export const checkBeforeSend = async (
  { request, response, state }: Context,
  next: () => Promise<unknown>
) => {
  const { name, text } = await request.body.json();
  const user = await User.get(name); // Initialize the user if one exists.

  if (user) {
    if (!user.permission()) {
      throw new GenericError(403);
    }

    user.text = text; // We can save text for user in case of extensibility.
    state.mails.push({ name: user.name, address: user.address, request: text });
  }

  response.status = 200;
  response.body = JSON.stringify({
    message: `Dear ${user?.name} your wish has been sent to the North Pole`,
  });

  await next();
};
