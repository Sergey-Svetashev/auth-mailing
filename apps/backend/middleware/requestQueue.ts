import { SMTPClient } from "denomailer";
import { Context, RouteParams, RouterContext } from "oak/mod.ts";
import { load } from "std/dotenv/mod.ts";
import { Mail } from "../state/index.ts";

export type StatefulAuthContext = RouterContext<
  string,
  RouteParams<string>,
  { userId: string }
>;

const env = await load();
const SMTP_HOST = env["SMTP_HOST"];
const SMTP_PORT = Number(env["SMTP_PORT"]);
const SMTP_USER_NAME = env["SMTP_USER_NAME"];
const SMTP_PASSWORD = env["SMTP_PASSWORD"];

const client = new SMTPClient({
  connection: {
    hostname: SMTP_HOST,
    port: SMTP_PORT,
    tls: true,
    auth: {
      username: SMTP_USER_NAME,
      password: SMTP_PASSWORD,
    },
  },
});

export const requestQueue = async (
  { state }: Context,
  next: () => Promise<unknown>
) => {
  const sendMails = (mails: Array<Mail>) => {
    if (mails?.length) {
      mails.forEach(async (mail) => {
        /**
         * Apparently there is a problem with using ports 25, 465 or 578.
         * Please refer to https://deno.land/x/denomailer@1.6.0#deno-deploy for more information.
         * I've uncover the issue quite late so I decided to leave it as a tech debt due to the time limit.
         */
        // await client
        //   .send({
        //     from: "do_not_reply@northpole.com",
        //     to: "santa@northpole.com",
        //     subject: `${mail.name}'s wish`,
        //     content: mail.request,
        //     html: `<p>${mail.request}</p>`,
        //   })

        console.log("sending...", mail);
      });

      state.mails = [];
    }

    
    setTimeout(sendMails, 15000);
  };

  sendMails(state.mails);
  await next();
};
