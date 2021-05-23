export const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const getErrorFields = (fieldName, errors) => {
  const fieldErrors = errors.filter((elem) => elem.location === fieldName);
  return fieldErrors;
};

export const removeArrayInOtherOne = (mainArray, removedArray) => {
  var array = mainArray,
    array2 = removedArray,
    set = new Set();
  array2.forEach((element) => {
    set.add(element._id);
  });
  array = array.filter((a) => !set.has(a._id));
  return array;
};
