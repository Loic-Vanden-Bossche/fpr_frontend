import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginCredentials, Profile, RegisterCredentials, Token } from "../types";
import { queriesConfiguration } from "./config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: queriesConfiguration(),
  tagTypes: ["PROFILE"],
  endpoints: builder => ({
    getProfile: builder.query<Profile, void>({
      query: () => "/profile",
      providesTags: ["PROFILE"]
    }),
    changeNickname: builder.mutation<Profile, string>({
      query: (nickname) => ({ url: "/profile", body: { nickname }, method: "PATCH" }),
      invalidatesTags: ["PROFILE"]
    }),
    register: builder.mutation<Token, RegisterCredentials>({
      query: credentials => ({ url: "/auth/register", method: "POST", body: credentials })
    }),
    login: builder.mutation<Token, LoginCredentials>({
      query: credentials => ({ url: "/auth/login", method: "POST", body: credentials })
    })
  })
});

export const { useGetProfileQuery, useLazyGetProfileQuery, useRegisterMutation, useLoginMutation, useChangeNicknameMutation } = authApi;
