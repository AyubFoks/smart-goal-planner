import GoalItem from "./GoalItem";

export default function GoalList({ goals, deleteGoal, depositToGoal, updateGoal }) {
  return (
    <div>
      <h2>All Goals</h2>
      {goals.length === 0 && <p>No goals yet. Add one above!</p>}
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          deleteGoal={deleteGoal}
          depositToGoal={depositToGoal}
          updateGoal={updateGoal}
        />
      ))}
    </div>
  );
}
