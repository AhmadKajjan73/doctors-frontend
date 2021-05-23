import { combineReducers } from "redux";

import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";

import loader from "./loader";
import dialog from "./dialog";
import user from "./user";
import admin from "./admin";
import tag from "./tag";
import subject from "./subject";

export default combineReducers({
  loader,
  dialog,
  subject,
  form: formReducer,
  toastr: toastrReducer,
  user,
  admin,
  tag,
});
