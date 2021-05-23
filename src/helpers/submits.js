import {
  required,
  minLength,
  alphaNumeric,
  isEmail,
  alphabet,
  isNumber,
  isPhoneNumber,
  minValue,
  isEquel,
  isEmpty,
} from "./validations";

import { getAge } from "./common";

import userApi from "../api/user";

import { toastr } from "react-redux-toastr";

export const submitAddSubject = (image, selectedTags, body, title) => {
  let errors = [];

  //image validation
  if (required(image) !== undefined)
    errors = [...errors, { location: "image", message: required(image) }];

  //selectedTags validation
  if (isEmpty(selectedTags) !== undefined)
    errors = [...errors, { location: "selectedTags", message: "Required" }];

  if (minValue(selectedTags.length, 3) !== undefined)
    errors = [
      ...errors,
      { location: "selectedTags", message: "Must be at least 3 tags selected" },
    ];

  //body validation

  if (required(body) !== undefined)
    errors = [...errors, { location: "body", message: required(body) }];

  console.log(body);
  if (minLength(body, 100) !== undefined)
    errors = [...errors, { location: "body", message: minLength(body, 100) }];

  //title validation
  if (required(title) !== undefined)
    errors = [...errors, { location: "title", message: required(title) }];

  if (minLength(title, 3) !== undefined)
    errors = [...errors, { location: "title", message: minLength(title, 3) }];

  if (errors.length > 0) return { status: "failed", errors };
};

export const submitAddTag = (name) => {
  let errors = [];
  if (required(name) !== undefined)
    errors = [...errors, { location: "name", message: required(name) }];
  if (name && minLength(name, 3) !== undefined)
    errors = [...errors, { location: "name", message: minLength(name, 3) }];
  if (name && alphaNumeric(name) !== undefined)
    errors = [...errors, { location: "name", message: alphaNumeric(name) }];
  if (errors.length > 0) return { status: "failed", errors };
};

export const submitRegister = async (
  image,
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  phoneNumber,
  birthday
) => {
  let errors = [];
  //image validation
  if (required(image) !== undefined)
    errors = [...errors, { location: "image", message: required(image) }];

  //email validation
  if (required(email) !== undefined)
    errors = [...errors, { location: "email", message: required(email) }];

  if (email && isEmail(email) !== undefined)
    errors = [...errors, { location: "email", message: isEmail(email) }];

  //password validation
  if (required(password) !== undefined)
    errors = [...errors, { location: "password", message: required(password) }];

  if (password && minLength(password, 8) !== undefined)
    errors = [
      ...errors,
      { location: "password", message: minLength(password, 8) },
    ];

  //confirmPassword validation
  if (required(confirmPassword) !== undefined)
    errors = [
      ...errors,
      { location: "confirmPassword", message: required(confirmPassword) },
    ];

  if (isEquel(password, confirmPassword) !== undefined)
    errors = [
      ...errors,
      {
        location: "confirmPassword",
        message: isEquel(password, confirmPassword),
      },
    ];

  //firstName validation
  if (required(firstName) !== undefined)
    errors = [
      ...errors,
      { location: "firstName", message: required(firstName) },
    ];

  if (firstName && alphabet(firstName) !== undefined)
    errors = [
      ...errors,
      { location: "firstName", message: alphabet(firstName) },
    ];

  //lastName validation
  if (required(lastName) !== undefined)
    errors = [...errors, { location: "lastName", message: required(lastName) }];

  if (lastName && alphabet(lastName) !== undefined)
    errors = [...errors, { location: "lastName", message: alphabet(lastName) }];

  //phoneNumber validation
  if (required(phoneNumber) !== undefined)
    errors = [
      ...errors,
      { location: "phoneNumber", message: required(phoneNumber) },
    ];

  if (phoneNumber && isPhoneNumber(phoneNumber) !== undefined)
    errors = [
      ...errors,
      { location: "phoneNumber", message: isPhoneNumber(phoneNumber) },
    ];

  //birthday validation
  if (required(birthday) !== undefined)
    errors = [...errors, { location: "birthday", message: required(birthday) }];

  if (birthday && minValue(getAge(birthday), 13))
    errors = [
      ...errors,
      { location: "birthday", message: minValue(getAge(birthday), 13) },
    ];

  if (errors.length > 0) return { status: "failed", errors };
  else {
    console.log(errors);
    var formData = new FormData();
    const user = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      age: getAge(birthday),
      token: "test",
      usertype: 1,
    };

    formData.append("user", JSON.stringify(user));
    formData.append(`profilePhoto`, image);
    const x = await userApi.registerUser(formData);
    if (x.ok) {
      toastr.success("submited", "yeah");
    }
    return { status: "success", errors };
  }
};

export const submitLogin = (email, password) => {
  let errors = [];

  //email validation
  if (required(email) !== undefined)
    errors = [...errors, { location: "email", message: required(email) }];

  if (email && isEmail(email) !== undefined)
    errors = [...errors, { location: "email", message: isEmail(email) }];

  //password validation
  if (required(password) !== undefined)
    errors = [...errors, { location: "password", message: required(password) }];

  if (password && minLength(password, 8) !== undefined)
    errors = [
      ...errors,
      { location: "password", message: minLength(password, 8) },
    ];
  if (errors.length > 0) return { status: "failed", errors };
};

export const submitAddConsultation = (diseaseHistory, question) => {
  let errors = [];

  //diseaseHistory validation
  if (required(diseaseHistory) !== undefined)
    errors = [
      ...errors,
      { location: "diseaseHistory", message: required(diseaseHistory) },
    ];

  //question validation
  if (required(question) !== undefined)
    errors = [...errors, { location: "question", message: required(question) }];

  if (question && minLength(question, 10) !== undefined)
    errors = [
      ...errors,
      { location: "question", message: minLength(question, 10) },
    ];

  if (errors.length > 0) return { status: "failed", errors };
};
