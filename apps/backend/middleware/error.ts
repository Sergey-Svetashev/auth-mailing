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
      case Status.BadRequest:
        response.status = Status.BadRequest;
        response.body = { message: error.message || "User does not exist." };

        break;
      case Status.Unauthorized:
        response.status = Status.Unauthorized;
        response.body = { message: error.message || "Not authenticated." };

        break;
      default:
        response.status = 500;
        response.body = { message: error.message || "Unhandled error." };
    }
  }
};
