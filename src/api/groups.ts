import { createApi } from "@reduxjs/toolkit/query/react";
import { queriesConfiguration } from "./config";
import { Group, Message } from "../types";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: queriesConfiguration('groups'),
  endpoints: builder => ({
    getGroups: builder.query<Group[], void>({
      query: () => ""
    }),
    getGroupMessage: builder.query<Message[], {id: string, page?: number, size?: number}>({
      query: ({ id, page = 0, size = 20 }) => `/${id}/messages?page=${page}&size=${size}`
    }),
    createGroup: builder.mutation<Group, {name: string, users: string[]}>(({
      query: data => ({url: "", method: "POST", body: data})
    }))
  })
});

export const { useGetGroupsQuery, useLazyGetGroupsQuery, useGetGroupMessageQuery, useLazyGetGroupMessageQuery, useCreateGroupMutation } = groupsApi;
