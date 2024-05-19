import { Context } from "https://deno.land/x/oak@v13.2.3/context.ts";
import { User } from "../models/user.ts";

const entries = {
  name: "Json",
  familyName: "Born",
};

export const getUserData = async (context: Context, next) => {
  context.response.status = 200;

  /**
   * create user
   */
  const name = 'First' 
  const password = '*'
  const user = new User(name, password)
  /** end create user */

  context.response.body = await user.getUser(name)
  next()
};

export const createPost = async ({request, response}: Context) => {};
