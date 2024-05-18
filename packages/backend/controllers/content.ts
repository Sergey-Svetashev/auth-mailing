import { Context } from "https://deno.land/x/oak@v13.2.3/context.ts";

const entries = {
  name: "Json",
  familyName: "Born",
};

export const getMain = (context: Context) => {
  context.response.status = 200;
  context.response.body = JSON.stringify({
    name: "test",
    password: "double_test",
  });
};

export const createFile = async (context: Context) => {
  try {
    await Deno.writeTextFile("./data/entries.json", JSON.stringify(entries));
    context.response.status = 200;
    context.response.body = { result: "File written!" };
  } catch (error) {
    context.response.status = 400;
    context.response.body = { "file fail": error };
  }
};
