// showLastCommitMessageForThisLibrary.js
import { create } from "apisauce";
require("dotenv").config();

export const api = create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
export const mainConfig = {
  withCredentials: true,
  credentials: "include",
};
