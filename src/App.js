import React, { useEffect, useState } from "react";
import AddGoalForm from "./components/AddGoalForm";
import GoalList from "./components/GoalList";
import Overview from "./components/Overview";
import "./index.css";

const API_URL = "http://localhost:3000/goals";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: 0,
    category: "",
    deadline: ""
  });

  // Fetch all goals
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setGoals(data));
  }, []);

  // Add goal
  const addGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) return;
    const goalToAdd = {
      ...newGoal,
      savedAmount: 0,
      createdAt: new Date().toISOString()
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goalToAdd)
    })
      .then((res) => res.json())
      .then((goal) => {
        setGoals([...goals, goal]);
        setNewGoal({ name: "", targetAmount: 0, category: "", deadline: "" });
      });
  };

  // Delete goal
  const deleteGoal = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() =>
      setGoals(goals.filter((g) => g.id !== id))
    );
  };

  // Update goal (name, targetAmount, category, deadline)
  const updateGoal = (id, updatedFields) => {
    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields)
    })
      .then((res) => res.json())
      .then((updatedGoal) =>
        setGoals(goals.map((g) => (g.id === id ? updatedGoal : g)))
      );
  };

  // Deposit
  const depositToGoal = (id, amount) => {
    const goal = goals.find((g) => g.id === id);
    if (!goal) return;
    const updatedAmount = goal.savedAmount + Number(amount);
    updateGoal(id, { savedAmount: updatedAmount });
  };

  return (
    <div className="container">
      <h1>Smart Goal Planner</h1>
      <Overview goals={goals} />
      <AddGoalForm newGoal={newGoal} setNewGoal={setNewGoal} addGoal={addGoal} />
      <GoalList
        goals={goals}
        deleteGoal={deleteGoal}
        depositToGoal={depositToGoal}
        updateGoal={updateGoal}
      />
    </div>
  );
}
