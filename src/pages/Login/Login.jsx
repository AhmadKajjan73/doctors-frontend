import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import CustomInput from "../../components/CustomInput";
import Recaptcha from "../../components/Recaptcha";
import { changePageLoadingStatus } from "../../actions/loader";
import { setUser } from "../../actions/user";
import { changeIsAdminStatus } from "../../actions/adminActions/isAdmin";

import submitLogin from "./submit";
import validation from "./validation";

var Login = ({ changePageLoadingStatus, setUser, changeIsAdminStatus }) => {
  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    changePageLoadingStatus(true);
    const anyErrors = validation.validateAll(email, password);
    if (anyErrors.email.length === 0 && anyErrors.password.length === 0) {
      const user = await submitLogin(email, password);
      if (user && user.usertype === 0) {
        changeIsAdminStatus(true);
        setUser(user);
      } else {
        changeIsAdminStatus(false);
        setUser(user);
      }
      if (user) history.push("/");
    } else {
      setErrors(anyErrors);
    }
    changePageLoadingStatus(false);
  };

  return (
    <div class="bg-grey-lighter  flex flex-col">
      <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div class="bg-secondary bg-opacity-10 px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl font-extrabold text-center text-primary">
            Login
          </h1>
          <form>
            <CustomInput
              type="text"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setErrors({
                  ...errors,
                  email: validation.validateEmail(e.target.value),
                });
                setEmail(e.target.value);
              }}
              errors={errors.email}
            />
            <CustomInput
              type="password"
              label="Password"
              value={password}
              onChange={(e) => {
                setErrors({
                  ...errors,
                  password: validation.validatePassword(e.target.value),
                });
                setPassword(e.target.value);
              }}
              errors={errors.password}
            />
            <Recaptcha />
            <button
              type="submit"
              class="w-full text-center py-3 rounded bg-light text-white hover:bg-green-dark focus:outline-none my-1"
              onClick={(e) => submit(e)}
            >
              Enter
            </button>
          </form>
          <Link to="./register">
            <button
              type="button"
              class="w-full text-center py-3 rounded bg-secondary text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  changePageLoadingStatus: (status) => {
    dispatch(changePageLoadingStatus(status));
  },
  setUser: (user) => dispatch(setUser(user)),
  changeIsAdminStatus: (status) => dispatch(changeIsAdminStatus(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
