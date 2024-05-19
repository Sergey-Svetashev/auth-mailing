import { getDb } from "../utils/database.ts";

type UserPosts = {
  posts: Array<{ title: string; text: string }>;
};

export class User {
  constructor(public name: string, public password: string) {}

  public async getUser(name: string) {
    const db = getDb();
    const user = await db
      .collection<UserPosts>("users")
      .findOne({ name })
      .catch(console.error);

    return user;
  }

  public save() {
    const db = getDb();

    db.collection("users");
  }
}
