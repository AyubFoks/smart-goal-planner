import { useState } from "react";

export default function DepositForm({ goalId, depositToGoal }) {
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    if (!amount || amount <= 0) return;
    depositToGoal(goalId, amount);
    setAmount("");
  };

  return (
    <div className="deposit-form">
      <input
        type="number"
        placeholder="Deposit Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
}
