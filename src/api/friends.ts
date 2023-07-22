import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { queriesConfiguration } from "./config";
import { Profile } from "../types";

export const friendsApi = createApi({
  reducerPath: "friendsApi",
  baseQuery: queriesConfiguration('friends'),
  tagTypes: ["invites", "friends"],
  endpoints: builder => ({
    getFriends: builder.query<Profile[], void>({
      query: () => "",
      providesTags: ["friends"]
    }),
    addFriend: builder.mutation<void, string>({
      query: (friend) => ({ method: "POST", url: "", body: { friend } })
    }),
    getPendingInvites: builder.query<Profile[], void>({
      query: () => "pending",
      providesTags: ["invites"]
    }),
    acceptInvite: builder.mutation<void, string>({
      query: (friend) => ({ method: "PATCH", url: `${friend}/approve` }),
      invalidatesTags: ["invites", "friends"]
    }),
    refuseInvite: builder.mutation<void, string>({
      query: (friend) => ({ method: "PATCH", url: `${friend}/deny` }),
      invalidatesTags: ["invites"]
    }),
    removeFriend: builder.mutation<void, string>({
      query: (friend) => ({ method: "DELETE", url: `${friend}` }),
      invalidatesTags: ["friends"]
    })
  })
});

export const {
  useGetFriendsQuery,
  useAddFriendMutation,
  useGetPendingInvitesQuery,
  useAcceptInviteMutation,
  useRefuseInviteMutation,
  useRemoveFriendMutation
} = friendsApi;

