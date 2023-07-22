import { Identity } from ".";

export interface Profile extends Identity{
  role: string;
  coins: number;
  updatedAt: Date;
  createdAt: Date;
}
