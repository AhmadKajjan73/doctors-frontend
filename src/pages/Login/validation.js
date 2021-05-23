import { isEmail, minLength, required } from "../../helpers/validations";

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

const validateAll = (email, password) => {
  let emailErrors = [],
    passwordErrors = [];

  if (required(email) !== undefined)
    emailErrors = [...emailErrors, required(email)];

  if (email && isEmail(email) !== undefined)
    emailErrors = [...emailErrors, isEmail(email)];

  //password validation
  if (required(password) !== undefined)
    passwordErrors = [...passwordErrors, required(password)];

  if (password && minLength(password, 8) !== undefined)
    passwordErrors = [...passwordErrors, minLength(password, 8)];

  let errors = {
    email: emailErrors,
    password: passwordErrors,
  };
  return errors;
};

export default {
  validateEmail,
  validatePassword,
  validateAll,
};
