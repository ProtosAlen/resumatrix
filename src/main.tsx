import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux"; // Import Provider from react-redux

import App from "./App.tsx";
import { Provider as NextUIProvider } from "./provider.tsx"; // Renamed to avoid conflict
import "@/styles/globals.css";

import store from './store/store.ts'; // Import your store

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <NextUIProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NextUIProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
