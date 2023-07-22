import { createApi } from "@reduxjs/toolkit/query/react";
import { queriesConfiguration } from "./config";
import { Group, Message } from "../types";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: queriesConfiguration('groups'),
  tagTypes: ["PROFILE"],
  endpoints: builder => ({
    getGroups: builder.query<Group[], void>({
      query: () => ""
    }),
    getGroupMessage: builder.query<Message[], string>({
      query: id => `/${id}/messages?page=0&size=20`
    })
  })
});

export const { useGetGroupsQuery, useGetGroupMessageQuery } = groupsApi;
