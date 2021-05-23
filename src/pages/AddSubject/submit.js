import subjectApi from "../../api/subject";
import _ from "lodash";
import { toastr } from "react-redux-toastr";

const submit = async (id, image, tags, body, title, authorId) => {
  var formData = new FormData();

  const subject = {
    id,
    title,
    tags,
    body,
    imageurl: _.isString(image) ? image : null,
    authorId,
  };

  formData.append("subject", JSON.stringify(subject));
  if (!_.isString(image)) {
    formData.append("subjectMainPhoto", image);
  } else formData.append("subjectMainPhoto", null);
  let response;
  if (!id) response = await subjectApi.addSubject(formData);
  else response = await subjectApi.updateSubject(formData);
  if (response.ok) {
    toastr.success("success", response.data.message);
    return response.data.data;
  } else {
    toastr.error(
      "error",
      response.data ? response.data.message : response.problem
    );
    return null;
  }
};

export default submit;
