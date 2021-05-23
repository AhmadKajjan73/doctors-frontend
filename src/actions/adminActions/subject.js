import { CHANGE_SUBJECT_FOR_DELETE } from "../../constant";

export const ChangeSubjectForDelete = (subject) => ({
  type: CHANGE_SUBJECT_FOR_DELETE,
  payload: subject,
});
