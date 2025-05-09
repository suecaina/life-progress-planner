import React from 'react';
import { motion } from 'framer-motion';

const categories = ['Career', 'Wellness', 'Finance', 'Learning'];

function GoalList({ goals, deleteGoal }) {
  return (
    <div className="goal-list">
      {categories.map((category) => {
        const filteredGoals = goals.filter((goal) => goal.category === category);
        if (filteredGoals.length === 0) return null;

        return (
          <div key={category} className="goal-section">
            <h2 className="category-heading">{category}</h2>
            {filteredGoals.map((goal) => {
              console.log(goal); // Check the goal object to ensure timeframe is there
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`goal-card ${goal.category.toLowerCase()}`}
                >
                  <h3>{goal.title}</h3>
                  <p>
                    <span className={`category-badge ${goal.category.toLowerCase()}`}>
                      {goal.category}
                    </span>
                  </p>

                  {goal.notes && <p>{goal.notes}</p>}

                  {/* Display app name and link */}
                  {goal.app && (
                    <p>
                      <strong>App: </strong>{goal.app}
                      <br />
                      <a href={goal.appLink} target="_blank" rel="noopener noreferrer">
                        {goal.appLink}
                      </a>
                    </p>
                  )}

                  {/* Display the timeframe, ensure goal.timeframe is defined */}
                  {goal.timeframe ? (
                    <p><strong>Timeframe:</strong> {goal.timeframe}</p>
                  ) : (
                    <p><strong>Timeframe:</strong> Not Set</p>
                  )}

                  {/* Delete Button */}
                  <button
                    className="delete-btn"
                    onClick={() => deleteGoal(goal.id)}
                  >
                    Delete
                  </button>
                </motion.div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;
