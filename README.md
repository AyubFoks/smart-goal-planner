# Smart Goal Planner

A simple React-based fintech application that helps users manage multiple savings goals. Users can create, update, delete, and deposit into goals while tracking progress with a visual progress bar. Data persistence is handled by `json-server` using a local `db.json` file.

---

## Features

- **CRUD for Goals**: Create, Read, Update, and Delete financial goals.
- **Deposits**: Add money to specific goals.
- **Progress Tracking**: Visual progress bar for each goal.
- **Overview Dashboard**:
  - Total number of goals
  - Total money saved
  - Goals completed
  - Deadline warnings and overdue notifications
- **Data Persistence**: All data is stored in `db.json` and served by `json-server`.

---

## Tech Stack

- **Frontend**: React (with Fetch API for HTTP requests)
- **Backend Simulation**: `json-server`

---

## Project Structure

```
smart-goal-planner/
 ├── db.json
 ├── public/
 │    └── index.html
 ├── src/
 │    ├── App.jsx
 │    ├── index.js
 │    ├── index.css
 │    └── components/
 │         ├── AddGoalForm.jsx
 │         ├── DepositForm.jsx
 │         ├── GoalItem.jsx
 │         ├── GoalList.jsx
 │         ├── Overview.jsx
 │         └── ProgressBar.jsx
 ├── package.json
 └── README.md
```

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/AyubFoks/smart-goal-planner
cd smart-goal-planner
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Add db.json
Ensure `db.json` exists in the root folder with sample data

### 4. Run json-server
In one terminal:
```bash
npx json-server --watch db.json --port 3000
```

### 5. Run the React App
In another terminal:
```bash
npm start
```

---

## Author

[Ayub Karanja](https://github.com/AyubFoks)
© 2025