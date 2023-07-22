import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { queriesConfiguration } from "./config";
import { SearchResult } from "../types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: queriesConfiguration('users'),
  endpoints: builder => ({
    searchUsers: builder.query<SearchResult[], string>({
      query: (search) => `search/${search}`
    })
  })
});

export const { useSearchUsersQuery } = usersApi;

