import React, { useReducer, useEffect } from "react";

import "./Input.css";

import { validate } from "../../../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: state.isTouched && validate(action.val, action.validators),
      };
      break;
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
      break;
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(props.id, inputState.value, inputState.isValid);
  }, [id, onInput, value, isValid]);

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const element =
    props.element === "textarea" ? (
      <textarea
        id={props.id}
        rows={props.rows}
        cols={props.cols}
        onChange={changeHandler}
        onFocus={touchHandler}
      >
        {inputState.value}
      </textarea>
    ) : (
      <input
        id={props.id}
        type={props.type || "text"}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onFocus={touchHandler}
        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
