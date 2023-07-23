import { createApi } from "@reduxjs/toolkit/query/react";
import { queriesConfiguration } from "./config.ts";
import { Games, MinimalGames } from "../types";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: queriesConfiguration("games"),
  tagTypes: ["games", "room"],
  endpoints: builder => ({
    getGames: builder.query<Games[], void>({
      query: () => "",
      providesTags: ["games"]
    }),
    getMyGames: builder.query<Games[], void>({
      query: () => "self",
      providesTags: ["games"]
    }),
    createGame: builder.mutation<Games, MinimalGames>({
      query: (game) => ({ method: "POST", url: "create", body: game }),
      invalidatesTags: ["games"]
    }),
    uploadGameThumbnail: builder.mutation<Games, {id: string, formData: FormData}>({
      query: ({ id, formData }) => ({ method: "POST", url: `${id}/picture`, body: formData }),
      invalidatesTags: ["games"]
    }),
    deleteGame: builder.mutation<Games, string>({
      query: (id) => ({ method: "DELETE", url: `${id}` }),
      invalidatesTags: ["games"]
    }),
    buildGame: builder.mutation<Games, {id: string, file: FormData}>({
      query: ({ id, file }) => ({ method: "POST", url: `${id}/build`, body: file }),
      invalidatesTags: ["games"]
    })
  })
});

export const {
  useGetGamesQuery,
  useGetMyGamesQuery,
  useCreateGameMutation,
  useUploadGameThumbnailMutation,
  useDeleteGameMutation,
  useBuildGameMutation
} = gamesApi;
