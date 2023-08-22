import React, {useReducer, useState } from "react";

const initialState = {
  inputValue : "",
  isTouched : false
}

const inputStateReducer = (state, action) => {
if(action.type === "INPUT"){
  return {
    inputValue:action.inputValue,
    isTouched:state.isTouched
  }
}
  if(action.type === "BLUR"){
    return {
     inputValue:state.inputValue,
      isTouched:true
    }
}
if(action.type === "RESET"){
  return initialState;
}
  return state;
}


const useInput = (validateValue) => {


const [inputState, inputDispatch] = useReducer(inputStateReducer, initialState);

  //const [enteredValue, setEnteredValue] = useState("");
 // const [isTouched, setIsTouched] = useState(false);

  //const valueIsValid = validateValue(enteredValue);
 // const valueHasError = !valueIsValid && isTouched;

  const valueIsValid = validateValue(inputState.inputValue)
  const valueHasError = !valueIsValid && inputState.isTouched;

  const valueInputChangeHandler = (event) => {
    inputDispatch({type:'INPUT', inputValue:event.target.value})
    //setEnteredValue(event.target.value);
  };

  const valueInputBlurHandler = (event) => {
    inputDispatch({type:"BLUR"})
    //setIsTouched(true);
  };

  const reset = () => {
    inputDispatch({type:"RESET"})
   // setEnteredValue("");
   // setIsTouched(false);
  };
  return {
    //value: enteredValue,
    value:inputState.inputValue,
    isValid: valueIsValid,
    valueHasError,
    valueInputChangeHandler,
    valueInputBlurHandler,
    reset,
  };
};

export default useInput;
