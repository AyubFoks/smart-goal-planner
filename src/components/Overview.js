export default function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completed = goals.filter((g) => g.savedAmount >= g.targetAmount).length;

  const getStatus = (goal) => {
    const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    // Mark as completed if goal is reached, regardless of deadline
    if (goal.savedAmount >= goal.targetAmount) {
      return { label: "Complete", color: "green", order: 3 }; 
    }
    if (daysLeft < 0) {
      return { label: "Overdue", color: "red", order: 0 };
    }
    if (daysLeft <= 30) {
      return { label: "Due Soon", color: "orange", order: 1 };
    }
    return { label: null, color: null, order: 2 };
  };

  const getTimeLeft = (goal) => {
    const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return "Deadline passed";
    if (daysLeft === 0) return "Today";
    if (daysLeft === 1) return "1 day left";
    return `${daysLeft} days left`;
  };

  // Sort goals: Overdue (0), Due Soon (1), Others (2), Completed (3)
  const sortedGoals = [...goals].sort((a, b) => {
    const orderA = getStatus(a).order;
    const orderB = getStatus(b).order;
    return orderA - orderB;
  });

  return (
    <div className="overview">
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: ${totalSaved}</p>
      <p>Goals Completed: {completed}</p>
      <hr />
      <h3>All Goals</h3>
      <ul className="overview-goal-list">
        {sortedGoals.map((goal) => {
          const status = getStatus(goal);
          return (
            <li
              key={goal.id}
              className={`overview-goal-item${status.label ? " status-" + status.label.toLowerCase().replace(" ", "-") : ""}`}
            >
              <div className="overview-goal-name">{goal.name}</div>
              <div className="overview-goal-details">
                {status.label && (
                  <span className={`overview-goal-status status-${status.label.toLowerCase().replace(" ", "-")}`}>
                    {status.label}
                  </span>
                )}
                <span className="overview-goal-time">
                  ({getTimeLeft(goal)})
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
