import { calculateAge } from "../utils/dates.ts";
import { GenericError } from "./errors.ts";
import { Status } from "oak/mod.ts";

type UserEntry = {
  username: string;
  uid: string;
};

type UserProfile = {
  userUid: string;
  address: string;
  birthdate: string;
};

const usersURL =
  "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json";
const profilesURL =
  "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json";

interface IUser {
  permission: () => boolean;
}

export class User implements IUser {
  constructor(
    public id: string,
    public name: string,
    public birthDate: string,
    public address?: string,
    public text?: string
  ) {}

  public static async get(name: string): Promise<User | void> {
    const usersResponse = await fetch(usersURL);
    const userProfilesResponse = await fetch(profilesURL);
    const users: UserEntry[] = await usersResponse.json();
    const userProfiles: UserProfile[] = await userProfilesResponse.json();
    const user = users.find((entry) => entry.username === name);
    const profile = userProfiles.find((entry) => entry.userUid === user?.uid);

    if (user && profile) {
      return new User(user.uid, name, profile.birthdate, profile.address);
    } else {
      throw new GenericError(Status.Unauthorized);
    }
  }

  public permission(): boolean {
    const age = calculateAge(this.birthDate);

    return age >= 10;
  }
}
