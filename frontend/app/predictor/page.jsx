'use client';

import { useState } from 'react';
import PredictorForm from '../components/predictor-form/page';
import ProbabilityGauge from '../components/probability-gauge/page';
import styles from './page.module.css';

export default function PredictorPage() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      // Transform form data to Flask API format
      const flaskPayload = {
        batting_team: formData.team_1,
        bowling_team: formData.team_2,
        runs_left: Math.max(0, 180 - Number(formData.runs_team1)),
        balls_left: Math.max(1, 120 - (Number(formData.overs_team1) * 6)),
        wickets_left: 10 - Number(formData.wickets_team1),
      };

      console.log(' Calling Flask at http://localhost:5000/api/predict');
      console.log('Payload:', flaskPayload);

      // Call Flask backend directly (bypass Next.js route)
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flaskPayload),
      });

      console.log(' Flask response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Prediction failed');
      }

      const data = await response.json();
      console.log(' Flask response:', data);

      // Format Flask response for display
      setPrediction({
        success: true,
        team_1: formData.team_1,
        team_2: formData.team_2,
        team_1_prob: Number(data.win_probability) || 0.5,
        team_2_prob: 1 - (Number(data.win_probability) || 0.5),
        probability: Math.round((Number(data.win_probability) || 0.5) * 100),
        winner: (Number(data.win_probability) || 0.5) > 0.5 ? formData.team_1 : formData.team_2,
        confidence: Number(data.confidence) || 0.8,
        prediction: data.prediction || 'unknown',
        model_source: 'ML Model (Python - Flask)',
      });
    } catch (err) {
      console.error('Error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.predictor}>
      <div className={styles.header}>
        <h1 className={styles.title}>Live Match Win Predictor</h1>
        <p className={styles.subtitle}>
          Enter match details to get instant win probability predictions
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.formSection}>
          <PredictorForm onPredict={handlePredict} loading={loading} />
        </div>

        <div className={styles.resultSection}>
          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Analyzing match data...</p>
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <p>Error: {error}</p>
            </div>
          )}

          {prediction && !loading && (
            <div className={styles.result}>
              <h2 className={styles.resultTitle}>Prediction Result</h2>
              <ProbabilityGauge probability={prediction.probability} />
              <div className={styles.predictions}>
                <div className={styles.predictionRow}>
                  <span className={styles.label}>{prediction.team_1}:</span>
                  <span className={styles.probability}>
                    {(prediction.team_1_prob * 100).toFixed(2)}%
                  </span>
                </div>
                <div className={styles.predictionRow}>
                  <span className={styles.label}>{prediction.team_2}:</span>
                  <span className={styles.probability}>
                    {(prediction.team_2_prob * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className={styles.confidence}>
                <p>
                  <strong>Predicted Winner:</strong> {prediction.winner}
                </p>
                <p>
                  <strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%
                </p>
                <p>
                  <strong>Prediction:</strong> {prediction.prediction?.replace('_', ' ').toUpperCase()}
                </p>
                {prediction.model_source && (
                  <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#10b981', fontWeight: '600' }}>
                    ✓ Using {prediction.model_source}
                  </p>
                )}
                <p className={styles.disclaimer}>
                  Powered by ML model trained on 1000+ IPL matches. Predictions are based on real machine learning analysis.
                </p>
              </div>
            </div>
          )}

          {!prediction && !loading && !error && (
            <div className={styles.placeholder}>
              <p className={styles.placeholderText}>Enter match details to see predictions</p>
              <p className={styles.placeholderIcon}>📊</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
