import {
  alphabet,
  isEmail,
  isEquel,
  isPhoneNumber,
  minLength,
  minValue,
  required,
} from "../../helpers/validations";

const validateDiseaseHistory = (diseaseHistory) => {
  let errors = [];
  //diseaseHistory validation

  if (required(diseaseHistory) !== undefined)
    errors = [...errors, required(diseaseHistory)];
  if (minLength(diseaseHistory, 50)) errors = [...errors, "too short"];
  return errors;
};

const validateQuestion = (question) => {
  let errors = [];

  //question validation
  if (required(question) !== undefined)
    errors = [...errors, required(question)];

  if (minLength(question, 20)) errors = [...errors, "too short"];
  return errors;
};

const validateAll = (diseaseHistory, question) => {
  let diseaseHistoryErrors = validateDiseaseHistory(diseaseHistory),
    questionErrors = validateQuestion(question);

  let errors = {
    diseaseHistory: diseaseHistoryErrors,
    question: questionErrors,
  };
  return errors;
};

export default {
  validateDiseaseHistory,
  validateQuestion,
  validateAll,
};
