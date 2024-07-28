import { Context, Status } from "oak/mod.ts";

export const errorHandle = async (
  { response }: Context,
  next: () => Promise<unknown>
) => {
  try {
    await next();
  } catch (error) {
    switch (error.statusCode) {
      case Status.NotFound:
        response.status = Status.NotFound;
        response.body = { message: error.message || "Not found a resource." };

        break;
      case Status.Forbidden:
        response.status = Status.Forbidden;
        response.body = { message: error.message || "User is not allowed to proceed as he is too young." };

        break;
      case Status.Unauthorized:
        response.status = Status.Unauthorized;
        response.body = { message: error.message || "User does not exist. Please register." };

        break;
      default:
        response.status = 500;
        response.body = { message: error.message || "Unhandled error." };
    }
  }
};
