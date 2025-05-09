import React, { useState, useEffect } from 'react';

function GoalForm({ setGoals }) {
  const [form, setForm] = useState({
    category: 'Career',
    title: '',
    notes: '',
    timeframe: 'Daily',  // Using 'timeframe' for the goal frequency
    app: '', // New field to store selected app
    appLink: '', // New field to store app link
  });

  const [suggestions, setSuggestions] = useState([]); // For storing app suggestions
  const [loading, setLoading] = useState(false); // Loading state for API requests

  useEffect(() => {
    if (form.app) {
      // Fetch apps from the iTunes API whenever the user types
      setLoading(true);
      fetch(`https://itunes.apple.com/search?term=${form.app}&entity=software&limit=5`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.results || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching apps:', error);
          setLoading(false);
        });
    } else {
      setSuggestions([]);
    }
  }, [form.app]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // Log the form object to check if 'timeframe' is included
    setGoals((prev) => [
      ...prev,
      { ...form, id: Date.now() },
    ]);
    setForm({ category: 'Career', title: '', notes: '', timeframe: 'Daily', app: '', appLink: '' });
  };

  const handleAppSelect = (app) => {
    setForm({
      ...form,
      app: app.trackName,
      appLink: app.collectionViewUrl, // Assuming the app URL is in `collectionViewUrl`
    });
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <select name="category" value={form.category} onChange={handleChange}>
        <option>Career</option>
        <option>Wellness</option>
        <option>Finance</option>
        <option>Learning</option>
      </select>

      <input
        name="title"
        placeholder="Goal Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="notes"
        placeholder="Details..."
        value={form.notes}
        onChange={handleChange}
      />

      <select name="timeframe" 
      value={form.timeframe} 
      onChange={handleChange}>
        <option>Daily</option>
        <option>Weekly</option>
        <option>Monthly</option>
        <option>Yearly</option>
      </select>

      {/* App Search Input */}
      <input
        name="app"
        placeholder="Search for an app (e.g., Strava)"
        value={form.app}
        onChange={handleChange}
      />

      {/* Show suggestions if there are any */}
      {loading && <p>Loading...</p>}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((app) => (
            <li key={app.trackId} onClick={() => handleAppSelect(app)}>
              {app.trackName}
            </li>
          ))}
        </ul>
      )}

      {/* App URL (auto-filled after selection) */}
      <input
        name="appLink"
        placeholder="App URL"
        value={form.appLink}
        readOnly
      />

      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
