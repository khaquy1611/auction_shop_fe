import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import { Provider } from "react-redux";
import configureStore from "./stores/configureStore";
import * as serviceWorker from "./serviceWorker";
import { API_NAME, API_URL } from "./constants/Configs";
import App from "./layouts/App";
const store = configureStore();

Amplify.configure({
  Auth: {
    // Cognito
    identityPoolId: process.env.IDENTITY_POOL_ID_AWS,
    region: process.env.REGION_AWS,
    userPoolId: process.env.USER_POOL_ID_AWS,
    userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID_AWS,
  },
  API: {
    endpoints: [
      {
        name: API_NAME,
        endpoint: API_URL,
        custom_header: async () => {
          try {
            let token = `Bearer ${(await Amplify.Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`;
            return { Authorization: token };
          } catch (e) {
            const mute = e;
          }
        },
      },
    ],
  },
});

// console.disableYellowBox = true;
// console.log("%cThis is a feature for developers of LSTN", "color: #ee4e00; font-size: x-large");
// console.warn = console.error = console.log = () => {};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
