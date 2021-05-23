import { api, mainConfig } from "./client";

const endpoint = "/comment";

const addCommenttEndPoint = "/add";
const updateCommentEndPoint = "/update";
const deleteCommentEndPoint = "/delete";

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const addComment = (data) =>
  api.post(endpoint + addCommenttEndPoint, data, { ...config, ...mainConfig });

const updateComment = (data) =>
  api.post(endpoint + updateCommentEndPoint, data, {
    ...config,
    ...mainConfig,
  });

const deleteComment = (data) =>
  api.post(endpoint + deleteCommentEndPoint, data, {
    ...config,
    ...mainConfig,
  });

export default {
  addComment,
  deleteComment,
  updateComment,
};
