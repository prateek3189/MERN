import React, { useState } from "react";

import "./NewGoal.css";
const NewGoal = (props) => {
  const [enteredText, setEnteredText] = useState("");

  const addGoalHandler = (e) => {
    e.preventDefault();

    const newGoal = {
      id: Math.random().toString(),
      text: enteredText,
    };
    setEnteredText("");
    props.onGoalAdded(newGoal);
  };

  const textChangedHandler = (event) => {
    setEnteredText(event.target.value);
  };

  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input type="text" onChange={textChangedHandler} value={enteredText} />
      <button>Add Goal</button>
    </form>
  );
};

export default NewGoal;
