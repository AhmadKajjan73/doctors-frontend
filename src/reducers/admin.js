import { CHANGE_IS_ADMIN_STATUS } from "../constant";

const INITIAL_STATE = {
  isAdmin: false,
};

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_IS_ADMIN_STATUS:
      return {
        ...state,
        isAdmin: action.payload,
      };

    default:
      return state;
  }
};
export default adminReducer;
