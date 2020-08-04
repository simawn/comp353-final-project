import React from "react";
import { AppContainer, setConfig } from "react-hot-loader";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

import AppRouter from "./AppRouter";
import store from "./state/store";

// Hide the react-hot-loader patch warning on console
setConfig({ showReactDomPatchNotification: false });

const reduxStore = store();

const renderApp = (App) => {
  render(
    <AppContainer>
      <Provider store={reduxStore}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

renderApp(AppRouter);
