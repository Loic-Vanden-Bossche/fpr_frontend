import { Profile } from ".";

export type GroupType = 'FRIEND' | 'GROUP'

export type GroupMember = {
  lastRead: Date
  user: Profile
}

export type Group = {
  id: string;
  name: string;
  type: GroupType;
  members: GroupMember[]
}
