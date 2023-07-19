import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Profile } from "../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.flash-player-revival.net/api" }),
  endpoints: builder => ({
    getProfile: builder.query<Profile, void>({
      query: () => "/profile"
    })
  })
});

export const { useGetProfileQuery } = authApi;
