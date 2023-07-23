import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { queriesConfiguration } from "./config";
import { Profile, SearchResult } from "../types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: queriesConfiguration('users'),
  endpoints: builder => ({
    searchUsers: builder.query<SearchResult[], string>({
      query: (search) => `search/${search}`
    }),
    changeProfilePicture: builder.mutation<Profile, FormData>({
      query: (file) => ({ method: "POST", url: "picture", body: file })
    })
  })
});

export const { useSearchUsersQuery, useChangeProfilePictureMutation } = usersApi;

