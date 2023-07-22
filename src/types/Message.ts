import { Profile } from "./Profile.ts";

export type Message = {
  id: string;
  createdAt: Date;
  message: string;
  user: Profile;
  type: string;
}
