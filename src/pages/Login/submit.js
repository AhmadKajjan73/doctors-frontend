import userApi from "../../api/user";
import { toastr } from "react-redux-toastr";

const submit = async (email, password) => {
  var formData = new FormData();
  const user = {
    email,
    password,
  };

  formData.append("user", JSON.stringify(user));

  const x = await userApi.logingUser(formData);
  if (x.ok) {
    toastr.success("success", x.data.message);
    return x.data.data;
  } else {
    toastr.error("error", x.data ? x.data.message : x.problem);
    return null;
  }
};

export default submit;
