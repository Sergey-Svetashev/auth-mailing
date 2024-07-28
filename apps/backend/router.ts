import { Router } from "oak/router.ts";
import * as Requester from "./controllers/requester.ts";

export const router = new Router();

router.post("/", Requester.checkBeforeSend);
