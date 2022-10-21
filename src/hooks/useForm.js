import { useState } from 'react';

export default function useForm(initialState) {
  const [values, setValues] = useState(initialState);

  function changeHandler(event) {
    const newValues = { ...values, [event.target.name]: event.target.value };
    setValues(newValues);
  }

  return { values, setValues, changeHandler };
}