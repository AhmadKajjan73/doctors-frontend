import { CHANGE_TAG_NAME_FOR_EDIT } from "../../constant";

export const changeTagNameForEdit = (tag) => ({
  type: CHANGE_TAG_NAME_FOR_EDIT,
  payload: tag,
});
