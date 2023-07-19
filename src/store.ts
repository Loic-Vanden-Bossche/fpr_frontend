import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: defaultMiddleware =>
    defaultMiddleware().concat(authApi.middleware)
});
