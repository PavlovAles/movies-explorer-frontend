export const isValidEmail = (email) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email.toLowerCase())
};

export const isRequired = (value) => {
  return value != null && value.trim().length > 0;
}

export const isNew = (newValue, oldValue) => newValue !== oldValue;

export const isAnythingChanged = (newValues, oldValues) => {
  const diff = Object.keys(newValues).map(key => newValues[key] !== oldValues[key])
  return diff.includes(true);
};