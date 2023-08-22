import { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  /* const [email, setEmail] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false); */

  const {
    value: enteredName,
    isValid: nameIsValid,
    valueHasError: nameHasError,
    valueInputChangeHandler: nameChangeHandler,
    valueInputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    valueHasError: emailHasError,
    valueInputChangeHandler: emailChangeHandler,
    valueInputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));

  /*  const emailIsValid = email.trim() !== "" && email.includes("@");
  const emailInputIsInvalid = !emailIsValid && emailIsTouched; */

  let formIsValid = false;
  if (nameIsValid && emailIsValid) {
    formIsValid = true;
  }
  console.log("name has error " + nameHasError);
  /* const emailInputChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const emailInputBlurHandler = (e) => {
    setEmailIsTouched(true);
  }; */

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // setEnteredNameTouched(true);

    if (!nameIsValid) {
      return;
    }

    //console.log(enteredName);

    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
    //setEnteredName("");
    resetName();
    resetEmail();
    // setEmail("");
    // setEnteredNameTouched(false);
    //setEmailIsTouched(false);
  };

  const nameInputClasses = nameHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameHasError && <p className="error-text">Name must not be empty.</p>}
      </div>

      <div className={nameInputClasses}>
        <label htmlFor="name">Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailHasError && (
          <p className="error-text">Email field must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
