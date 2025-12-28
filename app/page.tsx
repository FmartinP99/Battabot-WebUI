"use client";

import { Provider } from "react-redux";
import MainView from "./_components/MainView";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";

export default function Page() {
  return (
    <>
      <Toaster
        reverseOrder={true}
        position="bottom-right"
        toastOptions={{
          style: {
            zIndex: 9999,
            background: "#2a3441",
            color: "#d4dee7",
          },
        }}
      />

      <div className="relative z-10 text-center max-h-screen">
        <Provider store={store}>
          <MainView />
        </Provider>
      </div>
    </>
  );
}
