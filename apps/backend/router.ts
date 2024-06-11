import { Router } from "oak/router.ts";
import * as Signer from "./controllers/signer.ts";
import type { StatefulAuthContext } from "./middleware/authentication.ts";
import { authentication } from "./middleware/authentication.ts";

export const router = new Router();

router.post("/", authentication, ({ response, state }: StatefulAuthContext) => {
  response.status = 200;
  response.body = {
    message: `hello---${state.userId}`,
    userId: state.userId,
    // TODO: return user's data
  };
});

router.post("/sign-up", Signer.signUp);
router.post("/sign-in", Signer.signIn);
