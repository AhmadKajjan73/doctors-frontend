import { CHANGE_SUBJECT_FOR_DELETE } from "../constant";

const INITIAL_STATE = {
  subjectNameAndIdForDelete: null,
};

const tagReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SUBJECT_FOR_DELETE:
      return {
        ...state,
        subjectNameAndIdForDelete: action.payload,
      };

    default:
      return state;
  }
};
export default tagReducer;
