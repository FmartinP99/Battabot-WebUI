import { configureStore } from "@reduxjs/toolkit";
import websocketReducer from "@/app/_websocket/websocketSlice";
import { websocketMiddleware } from "@/app/_websocket/websocketMiddleware";
import { enableMapSet } from "immer";

enableMapSet();

export const store = configureStore({
  reducer: {
    websocket: websocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      websocketMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
