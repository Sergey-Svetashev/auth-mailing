import { Context, Request } from "https://deno.land/x/oak@v13.2.3/mod.ts";

export const signIn = ({request}: Context) => {
    const email = request.body.email
    const password = request.body.password
    const confirmPassword = request.body.confirmPassword

    // Deno.readTextFile
} 