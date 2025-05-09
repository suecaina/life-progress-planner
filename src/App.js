import React, { useState } from 'react';
import Confetti from 'react-confetti';
import GoalForm from './components/GoalForm';
import './App.css';  // Make sure the path is correct

function App() {
  const [goals, setGoals] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false); // Manage confetti visibility
  const affirmations = [
    "You are capable of amazing things.",
    "Small steps every day lead to big changes.",
    "Progress over perfection.",
    "Believe in yourself and all that you are.",
    "Every accomplishment starts with the decision to try."
  ];

  const [quote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    return affirmations[randomIndex];
  });

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const handleCompleteGoal = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Confetti will disappear after 3 seconds
  };

  return (
    <div className="app">
      <h1>Suecaina's Goal Tracker</h1>
      <p className="affirmation">{quote}</p>
      <GoalForm setGoals={setGoals} /> {/* Pass setGoals as a prop */}

      {/* Display confetti when a goal is completed */}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <div className="goal-list">
        {goals.length > 0 ? (
          goals.map(goal => (
            <div key={goal.id} className="goal-card">
              <h3>{goal.title}</h3>
              <p><strong>Category:</strong> {goal.category}</p>
              <p>{goal.notes}</p>
              <p>
                <strong>App: </strong>{goal.app}
                <br />
                <a href={goal.appLink} target="_blank" rel="noopener noreferrer">
                  {goal.appLink}
                </a>
              </p>
              <p>
              <strong>Timeframe: </strong>{goal.timeframe}
              </p>
              <button className="delete-button" onClick={() => deleteGoal(goal.id)}>Delete</button>

              {/* Complete button to trigger confetti */}
              <button className="complete-button" onClick={handleCompleteGoal}>Complete</button>
            </div>
          ))
        ) : (
          <p>No goals added yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
