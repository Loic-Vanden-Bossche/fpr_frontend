import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { queriesConfiguration } from "./config.ts";
import { Room, SessionAction } from "../types/Room.ts";

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: queriesConfiguration("rooms"),
  tagTypes: ["room"],
  endpoints: builder => ({
    getRooms: builder.query<Room[], void>({
      query: () => "",
      providesTags: ["room"]
    }),
    getRoom: builder.query<Room, string>({
      query: (id) => "/" + id,
      providesTags: ["room"]
    }),
    getRoomHistory: builder.query<SessionAction[], string>({
      query: (id) => `${id}/history`,
      providesTags: ["room"]
    })
  })
});

export const {
  useGetRoomsQuery,
  useLazyGetRoomsQuery,
  useGetRoomQuery,
  useGetRoomHistoryQuery,
  useLazyGetRoomHistoryQuery
} = roomsApi;
