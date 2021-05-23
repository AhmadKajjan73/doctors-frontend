import {
  CHANGE_ADD_TAGS_DIALOG_STATUS,
  CHANGE_DELETE_DIALOG_STATUS,
} from "../constant";

const INITIAL_STATE = {
  addTagDialogStatus: false,
  deleteDialogStatus: false,
};

const DialogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_ADD_TAGS_DIALOG_STATUS:
      return {
        ...state,
        addTagDialogStatus: action.payload,
      };
    case CHANGE_DELETE_DIALOG_STATUS:
      return {
        ...state,
        deleteDialogStatus: action.payload,
      };
    default:
      return state;
  }
};
export default DialogReducer;
