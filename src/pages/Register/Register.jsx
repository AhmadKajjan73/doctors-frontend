import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import CustomInput from "../../components/CustomInput";
import CustomMenu from "../../components/CustomMenu";
import Dropzone from "../../components/Dropzone";
import CustomButton from "../../components/CustomButton";
import Recaptcha from "../../components/Recaptcha";
import { changePageLoadingStatus } from "../../actions/loader";
import { setUser } from "../../actions/user";
import { changeIsAdminStatus } from "../../actions/adminActions/isAdmin";

import validation from "./validation";
import submitRegister from "./submit";

require("dotenv").config();

var Register = ({ changePageLoadingStatus, changeIsAdminStatus, setUser }) => {
  const [errors, setErrors] = useState({
    image: [],
    email: [],
    password: [],
    confirmPassword: [],
    firstName: [],
    lastName: [],
    gender: [],
    phoneNumber: [],
    birthday: [],
  });
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    changePageLoadingStatus(true);
    const anyErrors = validation.validateAll(
      image,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      gender,
      phoneNumber,
      birthday
    );
    if (
      anyErrors.image.length === 0 &&
      anyErrors.email.length === 0 &&
      anyErrors.password.length === 0 &&
      anyErrors.confirmPassword.length === 0 &&
      anyErrors.firstName.length === 0 &&
      anyErrors.lastName.length === 0 &&
      anyErrors.phoneNumber.length === 0 &&
      anyErrors.birthday.length === 0
    ) {
      const user = await submitRegister(
        image,
        email,
        password,
        firstName,
        lastName,
        gender,
        phoneNumber,
        birthday
      );
      setUser(user);
      if (user && user.userType === 0) {
        changeIsAdminStatus(true);
      } else {
        changeIsAdminStatus(false);
      }
      if (user) history.push("/");
    } else {
      setErrors(anyErrors);
    }
    changePageLoadingStatus(false);
  };

  return (
    <div class="bg-grey-lighter  flex flex-col h-full">
      <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div class="bg-secondary bg-opacity-10 px-6 py-8 rounded shadow-md text-black w-full">
          <div class="mb-8 text-3xl font-extrabold text-center text-primary">
            Sign up
          </div>
          <form>
            <div className="text-center p-4 flex flex-col justify-center items-center space-y-2">
              {
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : `${process.env.REACT_APP_BACKEND_IMAGES_URL}default_user.jpg`
                  }
                  className=" rounded-full object-cover w-48 h-48 border-secondary border-4 shadow-md"
                  alt="profile_photo"
                />
              }
              <div>
                <CustomButton type="button">
                  <Dropzone
                    setImage={setImage}
                    checkForErrors={(newImage) => {
                      setErrors({
                        ...errors,
                        image: validation.validateImage(newImage),
                      });
                    }}
                  >
                    upload
                  </Dropzone>
                </CustomButton>
                {
                  <div className="text-sm text-red-700 p-2">
                    {errors.image.map((elem, index) => {
                      return <div className="">{`${index + 1}. ${elem}`}</div>;
                    })}
                  </div>
                }
              </div>
            </div>
            <CustomInput
              type="text"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setErrors({
                  ...errors,
                  email: validation.validateEmail(e.target.value),
                });
                setEmail(e.target.value);
              }}
              errors={errors.email}
            />
            <CustomInput
              type="password"
              label="Password"
              value={password}
              onChange={(e) => {
                setErrors({
                  ...errors,
                  password: validation.validatePassword(e.target.value),
                  confirmPassword: validation.validateConfirmPassword(
                    e.target.value,
                    confirmPassword
                  ),
                });
                setPassword(e.target.value);
              }}
              errors={errors.password}
            />
            <CustomInput
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setErrors({
                  ...errors,
                  confirmPassword: validation.validateConfirmPassword(
                    password,
                    e.target.value
                  ),
                });
                setConfirmPassword(e.target.value);
              }}
              errors={errors.confirmPassword}
            />
            <CustomInput
              type="text"
              label="First Name"
              name="first-name"
              value={firstName}
              onChange={(e) => {
                setErrors({
                  ...errors,
                  firstName: validation.validateFirstName(e.target.value),
                });
                setFirstName(e.target.value);
              }}
              errors={errors.firstName}
            />
            <CustomInput
              type="text"
              label="Last Name"
              name="last-name"
              value={lastName}
              onChange={(e) => {
                setErrors({
                  ...errors,
                  lastName: validation.validateLastName(e.target.value),
                });
                setLastName(e.target.value);
              }}
              errors={errors.lastName}
            />
            <CustomMenu
              name="gender"
              placeholder="Gender"
              value={gender}
              onChange={(e) => {
                setErrors({
                  ...errors,
                  gender: validation.validateGender(e.target.value),
                });
                setGender(e.target.value);
              }}
              errors={errors.gender}
            >
              <option value="male" className="text-black">
                Male
              </option>
              <option value="female" className="text-black">
                Female
              </option>
            </CustomMenu>
            <CustomInput
              type="text"
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => {
                setErrors({
                  ...errors,
                  phoneNumber: validation.validatePhoneNumber(e.target.value),
                });
                setPhoneNumber(e.target.value);
              }}
              errors={errors.phoneNumber}
            />
            <div className="p-2 text-lg">
              <label>Birthday</label>
              <CustomInput
                type="date"
                label="Birthday"
                value={birthday}
                onChange={(e) => {
                  setErrors({
                    ...errors,
                    birthday: validation.validateBirthday(e.target.value),
                  });
                  setBirthday(e.target.value);
                }}
                errors={errors.birthday}
              />
            </div>
            <Recaptcha />
            <button
              type="submit"
              class="w-full text-center py-3 rounded bg-light text-white hover:bg-green-dark focus:outline-none my-1"
              onClick={(e) => submit(e)}
            >
              Create Account
            </button>
          </form>
          <Link to="./login">
            <button
              type="button"
              class="w-full text-center py-3 rounded bg-secondary text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Log in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  changePageLoadingStatus: (status) => {
    dispatch(changePageLoadingStatus(status));
  },
  setUser: (user) => dispatch(setUser(user)),
  changeIsAdminStatus: (status) => dispatch(changeIsAdminStatus(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
