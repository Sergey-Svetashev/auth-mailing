import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { Db, MongoClient } from "mongodb";

const env = await load();
const MONGO_USER_NAME = env["MONGO_USER_NAME"];
const MONGO_USER_PASSWORD = env["MONGO_USER_PASSWORD"];
const MONGO_DEFAULT_DB = env["MONGO_DEFAULT_DB"];

const uri = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_USER_PASSWORD}@fsp-cluster.yahbtt4.mongodb.net/${MONGO_DEFAULT_DB}?retryWrites=true&w=majority&appName=fsp-cluster`;
const client = new MongoClient(uri);

let _db: Db;

export const mondoDBConnect = (callback: () => void) => {
  client
    .connect()
    .then(async (client) => {
      await client.db("admin").command({ ping: 1 }); // Send a ping to confirm a successful connection.

      _db = client.db();
      callback();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error("Database is undefined.");
};
