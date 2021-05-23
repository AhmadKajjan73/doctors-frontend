import { mainConfig, api } from "./client";

const endpoint = "/consultation";
const addConsultationEndPoint = "/add";
const getAllConsultationOfUserEndPoing = "/getAllConsultationOfUser";
const getAllConsultationEndPoint = "/getAllConsultation";
const replayToEndPoint = "/replayto";

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};
const addConsultation = (data) =>
  api.post(endpoint + addConsultationEndPoint, data, {
    ...config,
    ...mainConfig,
  });

const replayToConsultation = (data) =>
  api.post(endpoint + replayToEndPoint, data, {
    ...config,
    ...mainConfig,
  });

const getAllConsultationOfUser = (id) =>
  api.get(
    endpoint + getAllConsultationOfUserEndPoing + "/" + id,
    null,
    mainConfig
  );

const getAllConsultation = () =>
  api.get(endpoint + getAllConsultationEndPoint, null, mainConfig);

export default {
  addConsultation,
  getAllConsultationOfUser,
  getAllConsultation,
  replayToConsultation,
};
