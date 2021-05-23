import {
  isEmpty,
  minLength,
  required,
  minValue,
} from "../../helpers/validations";

const validateImage = (image) => {
  let errors = [];
  //image validation
  if (required(image) !== undefined) errors = [...errors, required(image)];
  return errors;
};

const validateTags = (tags) => {
  let errors = [];
  //selectedTags validation
  if (isEmpty(tags) !== undefined) errors = [...errors, "Required"];

  if (minValue(tags.length, 3) !== undefined)
    errors = [...errors, "Must be at least 3 tags selected"];
  return errors;
};

const validateBody = (body) => {
  let errors = [];
  //body validation

  if (required(body) !== undefined) errors = [...errors, required(body)];

  if (minLength(body, 100) !== undefined) errors = [...errors, "Too short..."];
  return errors;
};

const validateTitle = (title) => {
  let errors = [];

  //title validation
  if (required(title) !== undefined) errors = [...errors, required(title)];

  if (minLength(title, 3) !== undefined)
    errors = [...errors, minLength(title, 3)];
  return errors;
};

const validateAll = (image, tags, body, title) => {
  let imageErrors = validateImage(image),
    titleErrors = validateTitle(title),
    tagsErrors = validateTags(tags),
    bodyErrors = validateBody(body);

  let errors = {
    image: imageErrors,
    title: titleErrors,
    tags: tagsErrors,
    body: bodyErrors,
  };
  return errors;
};

export default {
  validateAll,
  validateBody,
  validateTags,
  validateTitle,
  validateImage,
};
