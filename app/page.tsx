"use client";

import { Provider } from "react-redux";
import MainView from "./_components/MainView";
import { store } from "./_store/store";

export default function Page() {
  return (
    <div className="relative z-10 text-center ">
      <Provider store={store}>
        <MainView />
      </Provider>
    </div>
  );
}
