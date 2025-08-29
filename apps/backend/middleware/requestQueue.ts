import { Context, RouteParams, RouterContext } from "oak/mod.ts";
import { Mail } from "../state/index.ts";

export type StatefulAuthContext = RouterContext<
  string,
  RouteParams<string>,
  { userId: string }
>;

export const requestQueue = async (
  { state }: Context,
  next: () => Promise<unknown>
) => {
  const sendMails = (mails: Array<Mail>) => {
    if (mails?.length) {
      mails.forEach(async (mail) => {
        // TODO: mailing service

        console.log("sending...", mail);
      });

      state.mails = [];
    }

    setTimeout(sendMails, 15000);
  };

  sendMails(state.mails);
  await next();
};
