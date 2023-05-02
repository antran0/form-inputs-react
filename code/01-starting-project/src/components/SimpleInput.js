import React, { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  // Set initially to true to avoid displaying error message on page load.
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
    } else {
      console.log(`Submitting form! Name: ${enteredName}`);
      setEnteredNameIsValid(true);
      setEnteredName("");
    }
  };

  const nameInputClasses = enteredNameIsValid
    ? "form-control"
    : "form-control invalid";

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputChangeHandler}
        />
        {!enteredNameIsValid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
