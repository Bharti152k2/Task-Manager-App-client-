export let validateFormData = (formValues) => {
  let error = {};

  //! Title Validations
  let titleReg = /^[a-zA-Z\s]+$/g;
  if (formValues.title === "") {
    error.title = "Title should not be empty";
  } else if (formValues.title.length < 4) {
    error.title = "Title should contain atleast 4 characters";
  } else if (!titleReg.test(formValues.title)) {
    error.title = "Title should contain only characters";
  }

  //! PRIORITY VALIDATION
  if (formValues.priority === "") {
    error.priority = "Select a option";
  }

  //! Date validation
  if (formValues.date === "") {
    error.date = "Date is mandatory";
  }

  //! Description Validations
  let descRegex = /^[a-zA-Z0-9\s.,!?:;'"()\-]+$/;

  if (formValues.description === "") {
    error.description = "Description should be filled";
  } else if (!descRegex.test(formValues.description)) {
    error.description =
      "Description can contain alphabets,spaces,specialCharacters,numbers";
  }

  return error;
};
