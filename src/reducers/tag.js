import { CHANGE_TAG_NAME_FOR_EDIT } from "../constant";

const INITIAL_STATE = {
  tagNameForEdit: null,
};

const tagReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_TAG_NAME_FOR_EDIT:
      return {
        ...state,
        tagNameForEdit: action.payload,
      };

    default:
      return state;
  }
};
export default tagReducer;
