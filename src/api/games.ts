import { createApi } from "@reduxjs/toolkit/query/react";
import { queriesConfiguration } from "./config.ts";
import { Game, MinimalGame } from "../types";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: queriesConfiguration("games"),
  tagTypes: ["games", "room"],
  endpoints: builder => ({
    getGames: builder.query<Game[], void>({
      query: () => "",
      providesTags: ["games"]
    }),
    createGame: builder.mutation<Game, MinimalGame>({
      query: (game) => ({ method: "POST", url: "create", body: game }),
      invalidatesTags: ["games"]
    })
  })
});

export const { useGetGamesQuery, useCreateGameMutation } = gamesApi;
