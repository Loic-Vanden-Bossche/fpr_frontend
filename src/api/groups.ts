import { createApi } from "@reduxjs/toolkit/query/react";
import { queriesConfiguration } from "./config";
import { Group } from "../types";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: queriesConfiguration('groups'),
  tagTypes: ["PROFILE"],
  endpoints: builder => ({
    getGroups: builder.query<Group[], void>({
      query: () => ""
    })
  })
});

export const { useGetGroupsQuery } = groupsApi;
