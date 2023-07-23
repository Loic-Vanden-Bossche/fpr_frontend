import { configureStore } from "@reduxjs/toolkit";
import { authApi, friendsApi, groupsApi, usersApi } from "./api";
import { gamesApi } from "./api/games.ts";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer
  },
  middleware: defaultMiddleware => defaultMiddleware()
    .concat(authApi.middleware)
    .concat(groupsApi.middleware)
    .concat(friendsApi.middleware)
    .concat(usersApi.middleware)
    .concat(gamesApi.middleware)
});
