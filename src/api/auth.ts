import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginCredentials, Profile, RegisterCredentials, Token } from "../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.flash-player-revival.net/api",
    prepareHeaders: (header) => {
      const token = localStorage.getItem('token');
      if (token) { header.set('authorization', `Bearer ${token}`); }
      return header;
    }
  }),
  tagTypes: ["PROFILE"],
  endpoints: builder => ({
    getProfile: builder.query<Profile, void>({
      query: () => "/profile"
    }),
    register: builder.mutation<Token, RegisterCredentials>({
      query: credentials => ({ url: "/auth/register", method: "POST", body: credentials })
    }),
    login: builder.mutation<Token, LoginCredentials>({
      query: credentials => ({ url: "/auth/login", method: "POST", body: credentials })
    })
  })
});

export const { useGetProfileQuery, useLazyGetProfileQuery, useRegisterMutation, useLoginMutation } = authApi;
