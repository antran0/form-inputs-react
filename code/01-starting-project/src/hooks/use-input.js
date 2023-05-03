import { useReducer } from "react";

// Steps for using useReducer:
// 1) Group together all related states that we use to manage with multiple
//    useState calls.
// *** Before ***
// const [enteredValue, setEnteredValue] = useState("");
// const [isTouched, setIsTouched] = useState(false);
const INITIAL_INPUT_STATE = {
  enteredValue: "",
  isTouched: false,
};

// 2a) Declare a reducer function that accepts two paranters:
//      - The first parameter is the current state values.
//      - The second parameter is an object that can contain anything but
//        typically contains at least a 'type' property to specify what
//        action to take.
// 2b) Initially just return the initial state.
//
// Later, additional conditional branches can be set up to update the state
// based on the value of the 'type' property in action.
//
// Each branch of the conditional needs to return a newly updated state object
// containing all properties in the original initial state. Here the 'state'
// argument passed to the reducer function is guarenteed to store the most
// recent state.
const inputStateReducer = (state, action) => {
  switch (action.type) {
    case "VALUE_CHANGED":
      return { enteredValue: action.value, isTouched: state.isTouched };
    case "INPUT_BLUR":
      return { enteredValue: state.enteredValue, isTouched: action.value };
    case "RESET_INPUT":
    default:
      return INITIAL_INPUT_STATE;
  }
};

const useInput = (validateValue) => {
  // 3) Call the useReducer hook with our reducer function and initial state.
  //    The useReducer hook accepts 3 arguments:
  //      1. The reducer function that will be automatically by React when the
  //         returned dispatch function is called.
  //      2. The initial state.
  //      3. (Not used here) An initializer function
  //
  //    useReducer always returns 2 values:
  //      1. The input states
  //      2. A dispatch function that accepts an object that can contain any
  //         information needed to handle the action.
  const [inputState, dispatchInput] = useReducer(
    inputStateReducer,
    INITIAL_INPUT_STATE
  );

  // inferred states
  const valueIsValid = validateValue(inputState.enteredValue);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    // *** Before ***
    // setEnteredValue(event.target.value);
    //
    // For each 'type' value we use, there will be a corresponding conditional
    // branch in the reducer function to handle the type of request.
    dispatchInput({ type: "VALUE_CHANGED", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    // *** Before ***
    // setIsTouched(true);
    //
    // We don't need to pass in a new value for the isTouched state here if
    // we chosed to just set the value of isTouched to true explicitly in
    // the reducer function. But since we updated isTouched by doing:
    //    isTouched: action.value
    // we must include a 'value' property.
    dispatchInput({ type: "INPUT_BLUR", value: true });
  };

  const reset = () => {
    // The "RESET_INPUT" conditional branch does not use any property on the
    // action object we pass to the reducer function so we can omit them.
    dispatchInput({ type: "RESET_INPUT" });
  };

  return {
    value: inputState.enteredValue,
    isValid: valueIsValid,
    hasError, // same as hasError: hasError
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
