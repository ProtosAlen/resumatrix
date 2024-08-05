import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from 'react-intl';

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import { Provider as ReduxProvider } from "react-redux";
import "@/styles/globals.css";

import store from './store/store'; // Import your store

import * as messages from './locales/en/common.json'; // Import your translations
import { LanguageProvider } from './LanguageContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <LanguageProvider>
          <IntlProvider locale="en" messages={messages}>
            <Provider>
              <App />
            </Provider>
          </IntlProvider>
        </LanguageProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
);
