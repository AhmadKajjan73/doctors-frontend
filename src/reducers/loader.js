import {
  PAGE_LOADING_STATUS,
  TAGS_IN_ADD_SUBJECT_LOADING_STATUS,
  CONSULTATION_LOADING_STATUS,
} from "../constant";

const INITIAL_STATE = {
  pageLoadingState: false,
  tagsInAddSubjectStatus: false,
  consultationLoadingStatus: false,
};

const LoaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAGE_LOADING_STATUS:
      return {
        ...state,
        pageLoadingState: action.payload,
      };
    case TAGS_IN_ADD_SUBJECT_LOADING_STATUS:
      return {
        ...state,
        tagsInAddSubjectStatus: action.payload,
      };
    case CONSULTATION_LOADING_STATUS:
      return {
        ...state,
        consultationLoadingStatus: action.payload,
      };

    default:
      return state;
  }
};
export default LoaderReducer;
