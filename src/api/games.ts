import { createApi } from "@reduxjs/toolkit/query/react";
import { queriesConfiguration } from "./config.ts";
import { Game } from "../types/Games.ts";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: queriesConfiguration("games"),
  tagTypes: ["games", "room"],
  endpoints: builder => ({
    getGames: builder.query<Game[], void>({
      query: () => "",
      providesTags: ["games"]
    })
  })
});

export const { useGetGamesQuery } = gamesApi;
