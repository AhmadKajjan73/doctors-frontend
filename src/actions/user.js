import { SET_USER } from "../constant";

export const setUser = (status) => ({
  type: SET_USER,
  payload: status,
});
