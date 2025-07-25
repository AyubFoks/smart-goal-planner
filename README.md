# Smart Goal Planner

## Deployment Link

https://smart-goal-planner-five-zeta.vercel.app/


## Details

A simple React-based fintech application that helps users manage multiple savings goals. Users can create, update, delete, and deposit into goals while tracking progress with a visual progress bar. Data persistence is handled by Google Firebase API.

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
- **Data Persistence**: All data is stored in a Google Firebase database.

---

## Tech Stack

- **Frontend**: React
- **Backend/Data Persistence**: Google Firebase Realtime Database
- **Hosting**: Vercel

---

## Project Structure

```
smart-goal-planner/
 ├── public/
 │    └── index.html
 ├── src/
 │    ├── App.js
 │    ├── index.js
 │    ├── index.css
 │    ├── firebaseConfig.js
 │    └── components/
 │         ├── AddGoalForm.js
 │         ├── GoalItem.js
 │         ├── GoalList.js
 │         ├── Overview.js
 │         └── ProgressBar.js
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

### 3. Run the React App
In another terminal:
```bash
npm start
```

---

## Author

[Ayub Karanja](https://github.com/AyubFoks)
© 2025