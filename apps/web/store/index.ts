import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "./api";
import { uiSlice } from "./uiSlice";

export const store = configureStore({
  reducer: {
    // RTK Query cache — handles all server state
    [api.reducerPath]: api.reducer,
    // UI slice — handles all client/ephemeral state
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Typed hooks — use these everywhere instead of plain useDispatch/useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
