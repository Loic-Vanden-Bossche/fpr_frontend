import { configureStore } from "@reduxjs/toolkit";
import { authApi, friendsApi, groupsApi, usersApi } from "./api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer
  },
  middleware: defaultMiddleware => defaultMiddleware()
    .concat(authApi.middleware)
    .concat(groupsApi.middleware)
    .concat(friendsApi.middleware)
    .concat(usersApi.middleware)
});
