import { SET_USER } from "../constant";

const INITIAL_STATE = {
  userInfo: null,
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userInfo: action.payload,
      };

    default:
      return state;
  }
};
export default UserReducer;
