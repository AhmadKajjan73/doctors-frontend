import consultationApi from "../../api/consultation";
import { toastr } from "react-redux-toastr";

const submit = async (diseaseHistory, question, userId) => {
  var formData = new FormData();
  const consultation = {
    diseaseHistory,
    question,
    userId,
  };

  formData.append("consultation", JSON.stringify(consultation));

  const x = await consultationApi.addConsultation(formData);
  if (x.ok) {
    toastr.success("success", x.data.message);
    return x.data.data;
  } else {
    toastr.error("error", x.data.message);
    return null;
  }
};

export default submit;
