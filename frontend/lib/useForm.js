import { useState } from 'react';

export default function useForm(initial = {}) {
  // Create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'files') {
      value[0] = e.target.files;
    }
    setInputs({
      // Copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // Return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
