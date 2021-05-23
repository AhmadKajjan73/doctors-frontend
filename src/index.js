import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { BrowserRouter } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import store from "./store";
import "./index.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ReduxToastr
        timeOut={3000}
        preventDuplicates
        transitionIn="bounceInDown"
        transitionOut="bounceOutUp"
        closeOnToastrClick
      />
      <BrowserRouter>
        <GoogleReCaptchaProvider
          useRecaptchaNet
          reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
          scriptProps={{ async: true, defer: true, appendTo: "head" }}
          useEnterprise
        >
          <App />
        </GoogleReCaptchaProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
