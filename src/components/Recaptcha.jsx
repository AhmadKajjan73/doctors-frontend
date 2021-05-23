import React, { useState, useCallback } from "react";
import { useGoogleReCaptcha, GoogleReCaptcha } from "react-google-recaptcha-v3";

const GoogleRecaptchaExample = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState("");
  const [noOfVerifications, setNoOfVerifications] = useState(0);
  const [dynamicAction, setDynamicAction] = useState("homepage");
  const [actionToChange, setActionToChange] = useState("");

  const clickHandler = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    const result = await executeRecaptcha("login_page");

    setToken(result);
    setNoOfVerifications((noOfVerifications) => noOfVerifications + 1);
  }, [dynamicAction, executeRecaptcha]);

  const handleReCaptchaVerify = useCallback(
    (token) => {
      setToken(token);
      setNoOfVerifications((noOfVerifications) => noOfVerifications + 1);
    },
    [setNoOfVerifications, setToken]
  );

  const handleTextChange = useCallback((event) => {
    setActionToChange(event.target.value);
  }, []);

  const handleCommitAction = useCallback(() => {
    setDynamicAction(actionToChange);
  }, [actionToChange]);

  return (
    <div>
      <div>
        {/* <p>Current ReCaptcha action: {dynamicAction}</p>
        <input type="text" onChange={handleTextChange} value={actionToChange} />
        <button onClick={handleCommitAction}>Change action</button>
      </div>
      <br />
      <button onClick={clickHandler}>Run verify</button>
      <br />
      {token && <p>Token: {token}</p>}
      <p> No of verifications: {noOfVerifications}</p>
      <div> */}
        <GoogleReCaptcha
          action={dynamicAction}
          onVerify={handleReCaptchaVerify}
        />
      </div>
    </div>
  );
};
export default GoogleRecaptchaExample;
