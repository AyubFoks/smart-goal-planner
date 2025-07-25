import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

export default function GoalItem({ goal, deleteGoal, depositToGoal, updateGoal }) {
    const [depositAmount, setDepositAmount] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedGoal, setEditedGoal] = useState(goal);

    // Sync editedGoal with goal prop when goal changes
    useEffect(() => {
        setEditedGoal(goal);
    }, [goal]);

    const handleSave = () => {
        updateGoal(goal.id, editedGoal);
        setIsEditing(false);
    };

    const daysLeft = Math.ceil(
        (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
    );
    const isOverdue = daysLeft < 0 && goal.savedAmount < goal.targetAmount;
    const closeToDeadline = daysLeft <= 30 && daysLeft > 0;

    return (
        <div className={`goal-item ${isOverdue ? "overdue" : closeToDeadline ? "warning" : ""}`}>
            {isEditing ? (
                <>
                    <input
                        value={editedGoal.name}
                        onChange={(e) => setEditedGoal({ ...editedGoal, name: e.target.value })}
                    />
                    <input
                        type="number"
                        value={editedGoal.targetAmount}
                        onChange={(e) => setEditedGoal({ ...editedGoal, targetAmount: +e.target.value })}
                    />
                    <input
                        value={editedGoal.category}
                        onChange={(e) => setEditedGoal({ ...editedGoal, category: e.target.value })}
                    />
                    <input
                        type="date"
                        value={editedGoal.deadline}
                        onChange={(e) => setEditedGoal({ ...editedGoal, deadline: e.target.value })}
                    />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <h3>{goal.name}</h3>
                    <p className="item-details">
                        Category: {goal.category}
                        <span>Deadline: {goal.deadline}</span>
                        <span>Days left: {daysLeft}</span>
                        <span>Saved: ${goal.savedAmount} / ${goal.targetAmount}</span>
                        Remaining: ${goal.targetAmount - goal.savedAmount}
                    </p>
                    <ProgressBar value={(goal.savedAmount / goal.targetAmount) * 100} />
                </>
            )}
            <div className="actions">
                <div className="deposit-form">
                    <input
                        type="number"
                        placeholder="Add Funds"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            depositToGoal(goal.id, depositAmount);
                            setDepositAmount("");
                        }}
                    >
                        Deposit
                    </button>
                </div>
                <div className="goal-actions">
                    {!isEditing && <button className="edit-btn" onClick={() => setIsEditing(true)}>✎ Edit</button>}
                    <button className="delete-btn" onClick={() => deleteGoal(goal.id)}>✖ Delete</button>
                </div>
            </div>
        </div>
    );
}
