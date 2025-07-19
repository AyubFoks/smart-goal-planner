export default function AddGoalForm({ newGoal, setNewGoal, addGoal }) {
  return (
    <div className="form">
      <input
        placeholder="Goal Name"
        value={newGoal.name}
        onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Target Amount"
        value={newGoal.targetAmount}
        onChange={(e) => setNewGoal({ ...newGoal, targetAmount: +e.target.value })}
      />
      <input
        placeholder="Category"
        value={newGoal.category}
        onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
      />
      <input
        type="date"
        value={newGoal.deadline}
        onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
      />
      <button onClick={addGoal}>Add Goal</button>
    </div>
  );
}
