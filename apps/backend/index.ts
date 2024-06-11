import { Application, Context } from "oak/mod.ts";
import { load } from "std/dotenv/mod.ts";
import { errorHandle } from "./middleware/error.ts";
import { router } from "./router.ts";
import { mondoDBConnect } from "./utils/database.ts";

const env = await load();
const PORT = Number(env["PORT"]);

const origin = "http://localhost:4321";
const app = new Application();

app.use(async ({ response }: Context, next) => {
  console.log("Backend has been started");
  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  await next();
});

app.use(errorHandle);

app.use(router.routes());
app.use(router.allowedMethods());

mondoDBConnect(() => {
  app.listen({ port: PORT || 8082 });
});
