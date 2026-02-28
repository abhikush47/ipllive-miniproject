'use client';

import { useState } from 'react';
import styles from './predictor.module.css';

export default function PredictorForm({ onPredict, loading }) {
  const [formData, setFormData] = useState({
    team_1: 'Mumbai Indians',
    team_2: 'Chennai Super Kings',
    runs_team1: 150,
    wickets_team1: 5,
    overs_team1: 18,
    runs_team2: 120,
    wickets_team2: 3,
    overs_team2: 15,
    toss_winner: 'Mumbai Indians',
    chose_to_bat: true,
    venue: 'Wankhede Stadium',
  });

  const teams = [
    'Mumbai Indians',
    'Chennai Super Kings',
    'Kolkata Knight Riders',
    'Rajasthan Royals',
    'Delhi Capitals',
    'Punjab Kings',
    'Sunrisers Hyderabad',
    'Lucknow Super Giants',
  ];

  const venues = [
    'Wankhede Stadium',
    'M. A. Chidambaram Stadium',
    'Eden Gardens',
    'Sawai Mansingh Stadium',
    'Arun Jaitley Stadium',
    'Punjab Cricket Association',
    'Rajiv Gandhi International',
    'Ekana Cricket Stadium',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = value;
    
    if (type === 'checkbox') {
      finalValue = checked;
    } else if (type === 'number') {
      // Parse and ensure consistent number format
      finalValue = name.includes('overs') 
        ? parseFloat(value) || 0  // Allow decimals for overs
        : parseInt(value, 10) || 0; // Integers for others
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Match Details</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Team 1</label>
        <select
          name="team_1"
          value={formData.team_1}
          onChange={handleChange}
          className={styles.input}
        >
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Runs (Team 1)</label>
        <input
          type="number"
          name="runs_team1"
          value={formData.runs_team1}
          onChange={handleChange}
          min="0"
          max="250"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Wickets (Team 1)</label>
        <input
          type="number"
          name="wickets_team1"
          value={formData.wickets_team1}
          onChange={handleChange}
          min="0"
          max="10"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Overs (Team 1)</label>
        <input
          type="number"
          name="overs_team1"
          value={formData.overs_team1}
          onChange={handleChange}
          min="0"
          max="20"
          step="0.1"
          className={styles.input}
        />
      </div>

      <hr className={styles.divider} />

      <div className={styles.formGroup}>
        <label className={styles.label}>Team 2</label>
        <select
          name="team_2"
          value={formData.team_2}
          onChange={handleChange}
          className={styles.input}
        >
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Runs (Team 2)</label>
        <input
          type="number"
          name="runs_team2"
          value={formData.runs_team2}
          onChange={handleChange}
          min="0"
          max="250"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Wickets (Team 2)</label>
        <input
          type="number"
          name="wickets_team2"
          value={formData.wickets_team2}
          onChange={handleChange}
          min="0"
          max="10"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Overs (Team 2)</label>
        <input
          type="number"
          name="overs_team2"
          value={formData.overs_team2}
          onChange={handleChange}
          min="0"
          max="20"
          step="0.1"
          className={styles.input}
        />
      </div>

      <hr className={styles.divider} />

      <div className={styles.formGroup}>
        <label className={styles.label}>Venue</label>
        <select
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          className={styles.input}
        >
          {venues.map((venue) => (
            <option key={venue} value={venue}>
              {venue}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Toss Winner</label>
        <select
          name="toss_winner"
          value={formData.toss_winner}
          onChange={handleChange}
          className={styles.input}
        >
          <option value={formData.team_1}>{formData.team_1}</option>
          <option value={formData.team_2}>{formData.team_2}</option>
        </select>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="chose_to_bat"
            checked={formData.chose_to_bat}
            onChange={handleChange}
            className={styles.checkbox}
          />
          Toss winner chose to bat
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`${styles.button} ${loading ? styles.loading : ''}`}
      >
        {loading ? 'Predicting...' : 'Get Prediction'}
      </button>
    </form>
  );
}
