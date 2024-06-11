import { getDb } from "../utils/database.ts";

type UserNotes = Array<Partial<{ title: string; text: string }>>;

export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public notes?: UserNotes
  ) {}

  public static getUser(email: string) {
    const db = getDb();

    return db.collection("users").findOne({ email }); //TODO: return error
  }

  public save() {
    const db = getDb();

    return db.collection("users").insertOne(this);
  }
}
