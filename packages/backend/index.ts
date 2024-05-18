import { Application } from "https://deno.land/x/oak@v13.2.3/mod.ts";
import { router } from "./router.ts";

const origin = "http://localhost:4321";
const app = new Application();

app.use(async ({ response }, next) => {
  console.log('Backend has been started')
  response.headers.set("Access-Control-Allow-Origin", origin)
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, DELETE")
  response.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  await next()
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ hostname: "localhost", port: 8082 });
