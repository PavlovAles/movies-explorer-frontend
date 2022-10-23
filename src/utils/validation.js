export const isValidEmail = (email) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email.toLowerCase())
};

export const isValidName = (name) => {
  const reg = /^[A-Za-zА-Яа-я- ]+$/;
  return reg.test(name);
}

export const isRequired = (value) => {
  return value != null;
}

export const isCorrectLength = (value, min, max) => {
  return value != null && value.trim().length >= min && value.trim().length <= max;
}

export const isNew = (newValue, oldValue) => newValue !== oldValue;

export const isAnythingChanged = (newValues, oldValues) => {
  const diff = Object.keys(newValues).map(key => newValues[key] !== oldValues[key])
  return diff.includes(true);
};