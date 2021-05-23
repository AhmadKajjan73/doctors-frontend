import { api, mainConfig } from "./client";

const endpoint = "/subject";

const addSubjectEndPoint = "/add";
const updateSubjectEndPoint = "/update";
const deleteSubjectEndPoint = "/delete";
const getAllSubjectsEndPoint = "/getAllSubjects";
const getSubjectByIdEndPoint = "/getSubjectById";
const getSubjectByIdAfterAddingViewerEndPoint =
  "/getSubjectByIdAfterAddingViewer";

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const addSubject = (data) =>
  api.post(endpoint + addSubjectEndPoint, data, { ...config, ...mainConfig });

const updateSubject = (data) =>
  api.post(endpoint + updateSubjectEndPoint, data, {
    ...config,
    ...mainConfig,
  });

const deleteSubject = (data) =>
  api.post(endpoint + deleteSubjectEndPoint, data, {
    ...config,
    ...mainConfig,
  });

const getAllSubjects = () => api.get(endpoint + getAllSubjectsEndPoint);

const getSubjectById = (id) =>
  api.get(endpoint + getSubjectByIdEndPoint + "/" + id);

const getSubjectByIdAfterAddingViewer = (id) =>
  api.get(endpoint + getSubjectByIdAfterAddingViewerEndPoint + "/" + id);

export default {
  addSubject,
  updateSubject,
  deleteSubject,
  getAllSubjects,
  getSubjectByIdAfterAddingViewer,
  getSubjectById,
};
