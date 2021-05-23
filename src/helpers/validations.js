export const required = (value) => {
  return value || typeof value === "number" ? undefined : "Required";
};

export const maxLength = (value, max) => {
  return value && value.length > max
    ? `Must be ${max} characters or less`
    : undefined;
};

export const minLength = (value, min) => {
  return value && value.length < min
    ? `Must be ${min} characters or more`
    : undefined;
};

export const isNumber = (value) => {
  return value && isNaN(Number(value)) ? "Must be a number" : undefined;
};

export const minValue = (value, min) => {
  return value && value < min ? `Must be at least ${min}` : undefined;
};

export const maxValue = (value, max) => {
  return value && value > max ? `Must be at most ${max}` : undefined;
};

export const isEmail = (value) => {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
};

export const alphaNumeric = (value) => {
  return value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;
};

export const alphabet = (value) => {
  return value && /[^a-zA-Z ]/i.test(value)
    ? "Only alphabet characters"
    : undefined;
};

export const isPhoneNumber = (value) => {
  return value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;
};

export const isEquel = (value1, value2) => {
  return value1 && value2 && value1 !== value2 ? "no match" : undefined;
};

export const isEmpty = (value) => {
  return value.length === 0 ? "can't be empty" : undefined;
};
