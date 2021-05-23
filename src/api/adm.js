import { mainConfig, api } from "./client";

const endpoint = "/adm";
const testId3EndPoint = "/testId3";
const testBayesEndPoint = "/testBayes";

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};
const id3 = (data) => api.post(endpoint + testId3EndPoint, data, config);
const bayes = (data) => api.post(endpoint + testBayesEndPoint, data, config);

export default {
  id3,
  bayes,
};
