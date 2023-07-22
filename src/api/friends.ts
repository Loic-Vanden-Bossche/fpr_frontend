import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { queriesConfiguration } from "./config";
import { Profile } from "../types";

export const friendsApi = createApi({
  reducerPath: "friendsApi",
  baseQuery: queriesConfiguration('friends'),
  endpoints: builder => ({
    getFriends: builder.query<Profile[], void>({
      query: () => ""
    }),
    addFriend: builder.mutation<Profile[], string>({
      query: (friend) => ({ method: "POST", url: "", body: { friend } })
    })
  })
});

export const { useGetFriendsQuery, useAddFriendMutation } = friendsApi;

