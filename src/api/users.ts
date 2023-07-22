import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { queriesConfiguration } from "./config";
import { Profile } from "../types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: queriesConfiguration('users'),
  endpoints: builder => ({
    searchUsers: builder.query<Profile[], string>({
      query: (search) => `search/${search}`
    })
  })
});

export const { useSearchUsersQuery } = usersApi;

