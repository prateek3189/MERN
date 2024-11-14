import React, { useState } from "react";

import "./App.css";
import GoalList from "./components/GoalList/GoalList";
import NewGoal from "./components/NewGoal/NewGoal";

const App = () => {
  const [courseGoals, setCourseGoals] = useState([
    { id: "cg1", text: "Finish The Course" },
    { id: "cg2", text: "All About the course" },
    { id: "cg3", text: "Help Others" },
  ]);

  const onGoalAddedHandler = (goal) => {
    setCourseGoals((prevCourseGoals) => prevCourseGoals.concat(goal));
  };

  return (
    <div className="course-goals">
      <h2>Course Goals</h2>
      <NewGoal onGoalAdded={onGoalAddedHandler} />
      <GoalList goals={courseGoals} />
    </div>
  );
};

export default App;
