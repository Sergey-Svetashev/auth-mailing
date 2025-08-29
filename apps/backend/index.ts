import type { Context } from "oak/mod.ts";
import { Application } from "oak/mod.ts";
import { load } from "std/dotenv/mod.ts";
import { errorHandle } from "./middleware/error.ts";
import { requestQueue } from "./middleware/requestQueue.ts";
import { router } from "./router.ts";
import type { State } from "./state/index.ts";
import { appState } from "./state/index.ts";

const env = await load();
const PORT = Number(env["PORT"]);
const CLIENT_ORIGIN = env["CLIENT_ORIGIN"];

const app = new Application<State>({ state: appState });

app.use(async ({ response }: Context, next) => {
  response.headers.set("Access-Control-Allow-Origin", CLIENT_ORIGIN);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  await next();
});

app.use(errorHandle);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(requestQueue);

app.listen({ port: PORT || 8081 });
