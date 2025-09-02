import { Router } from "oak/router.ts";
import * as Requester from "./controllers/requester.ts";
import { signUp, signIn } from "./controllers/authenticator.ts";

export const router = new Router();

router.post("/", Requester.checkBeforeSend);
router.post("/signup", signUp);
router.post("/signin", signIn);
