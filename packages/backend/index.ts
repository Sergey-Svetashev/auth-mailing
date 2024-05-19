import { Application } from "https://deno.land/x/oak@v13.2.3/mod.ts";
import { router } from "./router.ts";
import { mondoDBConnect } from "./utils/database.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const env = await load()
const PORT = env['PORT']

const origin = "http://localhost:4321";
const app = new Application();

app.use(async ({ response }, next) => {
  console.log("Backend has been started");
  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, DELETE");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

mondoDBConnect(() => {
  app.listen({ port: PORT || 8082 });
});
