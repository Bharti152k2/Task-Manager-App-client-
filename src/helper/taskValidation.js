export let validateFormData = (formValues) => {
  let error = {};

  //! Category Validations
  let charRegex = /[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+)*/;
  if (formValues.title === "") {
    error.title = "Title should be empty";
  } else if (formValues.title.length < 4) {
    error.title = "Title should contain atleast 4 characters";
  } else if (!charRegex.test(formValues.title)) {
    error.category = "Title should contain only characters";
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

  if (formValues.description === "") {
    error.description = "Description should be filled";
  }

  return error;
};
