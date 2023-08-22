import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const isNotEmpty = (value) => value !== "";
  const isEmailAndNotEmpty = (value) => value !== "" && value.includes("@");

  const {
    value: enteredFirstName,
    isValid: firstNameIsValid,
    valueHasError: firstNameHasError,
    valueInputChangeHandler: firstNameChangeHandler,
    valueInputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    valueHasError: lastNameHasError,
    valueInputChangeHandler: lastNameChangeHandler,
    valueInputBlurHandler: lastNameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    valueHasError: emailHasError,
    valueInputChangeHandler: emailChangeHandler,
    valueInputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmailAndNotEmpty);

  let formIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log(
      "First Name : " + enteredFirstName,
      "Last Name : " + enteredLastName,
      "Email " + enteredEmail
    );
    resetEmail();
    resetFirstName();
    resetName();
  };

  const fNameClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lNameClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const eNameClasses = emailHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={fNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={enteredFirstName}
          />
        </div>
        {firstNameHasError && (
          <p className="error-text">First name must not be empty</p>
        )}
        <div className={lNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={enteredLastName}
          />
        </div>
        {lastNameHasError && (
          <p className="error-text">Last name must not be empty</p>
        )}
      </div>
      <div className={eNameClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
      </div>
      {emailHasError && (
        <p className="error-text">
          Email must contain "@" and must not be empty
        </p>
      )}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
