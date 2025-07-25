import React, { useEffect, useState } from "react";
import AddGoalForm from "./components/AddGoalForm";
import GoalList from "./components/GoalList";
import Overview from "./components/Overview";
import { db } from './firebaseConfig';
import { ref, onValue, push, set, remove, update } from "firebase/database";
import "./index.css";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: 0,
    category: "",
    deadline: ""
  });

  // Fetch all goals from Firebase
  useEffect(() => {
    const goalsRef = ref(db, "goals");
    const unsubscribe = onValue(goalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object to array with id
        setGoals(Object.entries(data).map(([id, goal]) => ({ id, ...goal })));
      } else {
        setGoals([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Add goal
  const addGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) return;
    const goalToAdd = {
      ...newGoal,
      savedAmount: 0,
      createdAt: new Date().toISOString()
    };
    const goalsRef = ref(db, "goals");
    const newGoalRef = push(goalsRef);
    set(newGoalRef, goalToAdd);
    setNewGoal({ name: "", targetAmount: 0, category: "", deadline: "" });
  };

  // Delete goal
  const deleteGoal = (id) => {
    const goalRef = ref(db, `goals/${id}`);
    remove(goalRef);
  };

  // Update goal (name, targetAmount, category, deadline)
  const updateGoal = (id, updatedFields) => {
    const goalRef = ref(db, `goals/${id}`);
    update(goalRef, updatedFields);
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
      <p>Track your financial goals and stay motivated!</p>
      <div className="page">
        <div className="sidebar">
          <Overview goals={goals} />
          <AddGoalForm newGoal={newGoal} setNewGoal={setNewGoal} addGoal={addGoal} />
        </div>
        <div className="main-content">
          <GoalList
            goals={goals}
            deleteGoal={deleteGoal}
            depositToGoal={depositToGoal}
            updateGoal={updateGoal}
          />
        </div>
      </div>
    </div>
  );
}
