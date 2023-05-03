import React, { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  // inferred states
  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // Works for one input.
  // If there are more than one input, we need to add additional checks.
  let formIsValid = enteredNameIsValid;

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);

    if (enteredNameIsValid) {
      console.log(`Submitting form! Name: ${enteredName}`);
      setEnteredName("");
      setEnteredNameTouched(false);
    }
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
