import {
  alphabet,
  isEmail,
  isEquel,
  isPhoneNumber,
  minLength,
  minValue,
  required,
} from "../../helpers/validations";

import { getAge } from "../../helpers/common";

const validateImage = (image) => {
  let errors = [];
  //image validation
  if (required(image) !== undefined) errors = [...errors, required(image)];
  return errors;
};

const validateEmail = (email) => {
  let errors = [];

  //email validation
  if (required(email) !== undefined) errors = [...errors, required(email)];

  if (email && isEmail(email) !== undefined)
    errors = [...errors, isEmail(email)];
  return errors;
};

const validatePassword = (password) => {
  let errors = [];

  //password validation
  if (required(password) !== undefined)
    errors = [...errors, required(password)];

  if (password && minLength(password, 8) !== undefined)
    errors = [...errors, minLength(password, 8)];
  return errors;
};

const validateConfirmPassword = (password, confirmPassword) => {
  let errors = [];

  //confirmPassword validation
  if (required(confirmPassword) !== undefined)
    errors = [...errors, required(confirmPassword)];

  if (isEquel(password, confirmPassword) !== undefined)
    errors = [...errors, isEquel(password, confirmPassword)];
  return errors;
};

const validateFirstName = (firstName) => {
  let errors = [];

  //firstName validation
  if (required(firstName) !== undefined)
    errors = [...errors, required(firstName)];

  if (firstName && alphabet(firstName) !== undefined)
    errors = [...errors, alphabet(firstName)];
  return errors;
};

const validateLastName = (lastName) => {
  let errors = [];

  //lastName validation
  if (required(lastName) !== undefined)
    errors = [...errors, required(lastName)];

  if (lastName && alphabet(lastName) !== undefined)
    errors = [...errors, alphabet(lastName)];
  return errors;
};

const validateGender = (gender) => {
  let errors = [];

  //gender validation
  if (required(gender) !== undefined) errors = [...errors, required(gender)];

  return errors;
};

const validatePhoneNumber = (phoneNumber) => {
  let errors = [];

  //phoneNumber validation
  if (required(phoneNumber) !== undefined)
    errors = [...errors, required(phoneNumber)];

  if (phoneNumber && isPhoneNumber(phoneNumber) !== undefined)
    errors = [...errors, isPhoneNumber(phoneNumber)];
  return errors;
};

const validateBirthday = (birthday) => {
  let errors = [];

  //birthday validation
  if (required(birthday) !== undefined)
    errors = [...errors, required(birthday)];

  if (birthday && minValue(getAge(birthday), 13))
    errors = [...errors, minValue(getAge(birthday), 13)];
  return errors;
};

const validateAll = (
  image,
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  gender,
  phoneNumber,
  birthday
) => {
  let imageErrors = [],
    emailErrors = [],
    passwordErrors = [],
    confirmPasswordErrors = [],
    firstNameErrors = [],
    lastNameErrors = [],
    genderErrors = [],
    phoneNumberErrors = [],
    birthdayErrors = [];

  //image validation
  // if (required(image) !== undefined)
  //   imageErrors = [...imageErrors, required(image)];

  //email validation
  if (required(email) !== undefined)
    emailErrors = [...emailErrors, required(email)];

  if (email && isEmail(email) !== undefined)
    emailErrors = [...emailErrors, isEmail(email)];

  //password validation
  if (required(password) !== undefined)
    passwordErrors = [...passwordErrors, required(password)];

  if (password && minLength(password, 8) !== undefined)
    passwordErrors = [...passwordErrors, minLength(password, 8)];

  //confirmPassword validation
  if (required(confirmPassword) !== undefined)
    confirmPasswordErrors = [
      ...confirmPasswordErrors,
      required(confirmPassword),
    ];

  if (isEquel(password, confirmPassword) !== undefined)
    confirmPasswordErrors = [
      ...confirmPasswordErrors,
      isEquel(password, confirmPassword),
    ];

  //firstName validation
  if (required(firstName) !== undefined)
    firstNameErrors = [...firstNameErrors, required(firstName)];

  if (firstName && alphabet(firstName) !== undefined)
    firstNameErrors = [...firstNameErrors, alphabet(firstName)];

  //lastName validation
  if (required(lastName) !== undefined)
    lastNameErrors = [...lastNameErrors, required(lastName)];

  if (lastName && alphabet(lastName) !== undefined)
    lastNameErrors = [...lastNameErrors, alphabet(lastName)];

  //gender validation
  if (required(gender) !== undefined)
    genderErrors = [...genderErrors, required(gender)];

  //phoneNumber validation
  if (required(phoneNumber) !== undefined)
    phoneNumberErrors = [...phoneNumberErrors, required(phoneNumber)];

  if (phoneNumber && isPhoneNumber(phoneNumber) !== undefined)
    phoneNumberErrors = [...phoneNumberErrors, isPhoneNumber(phoneNumber)];

  //birthday validation
  if (required(birthday) !== undefined)
    birthdayErrors = [...birthdayErrors, required(birthday)];

  if (birthday && minValue(getAge(birthday), 13))
    birthdayErrors = [...birthdayErrors, minValue(getAge(birthday), 13)];

  let errors = {
    image: imageErrors,
    email: emailErrors,
    password: passwordErrors,
    confirmPassword: confirmPasswordErrors,
    firstName: firstNameErrors,
    lastName: lastNameErrors,
    gender: genderErrors,
    phoneNumber: phoneNumberErrors,
    birthday: birthdayErrors,
  };
  return errors;
};

export default {
  validateBirthday,
  validateConfirmPassword,
  validateEmail,
  validateFirstName,
  validateImage,
  validateLastName,
  validatePassword,
  validatePhoneNumber,
  validateGender,
  validateAll,
};
