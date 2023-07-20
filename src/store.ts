import { configureStore } from "@reduxjs/toolkit";
import { authApi, groupsApi } from "./api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer
  },
  middleware: defaultMiddleware => defaultMiddleware()
    .concat(authApi.middleware)
    .concat(groupsApi.middleware)
});
