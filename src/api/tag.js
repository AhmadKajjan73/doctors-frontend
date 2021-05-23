import { mainConfig, api } from "./client";

const endpoint = "/tag";
const addTagEndPoint = "/add";
const updateTagEndPoint = "/update";
const getAllTagsByUserEndpoint = "/getAllTags";
const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};
const addTag = (data) =>
  api.post(endpoint + addTagEndPoint, data, { ...config, ...mainConfig });
const updateTag = (data) =>
  api.post(endpoint + updateTagEndPoint, data, { ...config, ...mainConfig });

const getAllTags = () => api.get(endpoint + getAllTagsByUserEndpoint);

export default {
  addTag,
  updateTag,
  getAllTags,
};
