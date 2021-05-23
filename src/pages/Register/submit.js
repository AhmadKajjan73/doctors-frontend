import { getAge } from "../../helpers/common";
import userApi from "../../api/user";
import { toastr } from "react-redux-toastr";

const submit = async (
  image,
  email,
  password,
  firstName,
  lastName,
  gender,
  phoneNumber,
  birthday
) => {
  var formData = new FormData();
  const user = {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    gender,
    age: getAge(birthday),
    usertype: 1,
  };

  formData.append("user", JSON.stringify(user));
  formData.append(`profilePhoto`, image);

  const x = await userApi.registerUser(formData);
  if (x.ok) {
    toastr.success("success", x.data.message);
    return x.data.data;
  } else {
    toastr.error("error", x.data.message);
    return null;
  }
};

export default submit;
