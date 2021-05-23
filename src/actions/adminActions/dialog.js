import {
  CHANGE_ADD_TAGS_DIALOG_STATUS,
  CHANGE_DELETE_DIALOG_STATUS,
} from "../../constant";

export const changeAddTagDialogStatus = (status) => ({
  type: CHANGE_ADD_TAGS_DIALOG_STATUS,
  payload: status,
});

export const changeDeleteDialogStatus = (status) => ({
  type: CHANGE_DELETE_DIALOG_STATUS,
  payload: status,
});
