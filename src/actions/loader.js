import {
  PAGE_LOADING_STATUS,
  TAGS_IN_ADD_SUBJECT_LOADING_STATUS,
  CONSULTATION_LOADING_STATUS,
} from "../constant";

export const changePageLoadingStatus = (status) => ({
  type: PAGE_LOADING_STATUS,
  payload: status,
});

export const changeTagsInAddSubjectLoadingStatus = (status) => ({
  type: TAGS_IN_ADD_SUBJECT_LOADING_STATUS,
  payload: status,
});
export const changeConsultationLoadingStatus = (status) => ({
  type: CONSULTATION_LOADING_STATUS,
  payload: status,
});
