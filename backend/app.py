"""
IPL Live Match Win Predictor - Backend API
==========================================
Flask API server that serves win probability predictions.
The model is trained on historical IPL match data.

Usage:
    python app.py
    
The API will be available at http://localhost:5000

Endpoints:
    POST //api/predict - Get win probability for a match state
    GET  /api/health  - Health check
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os
import logging
from datetime import datetime
import traceback

# ============================================================================
# Configuration
# ============================================================================

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "live_model.pkl")

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Model path
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "live_model.pkl")

# ============================================================================
# Load Model
# ============================================================================

model = None

def load_model():
    """Load trained model from pickle file"""
    global model
    try:
        if os.path.exists(MODEL_PATH):
            with open(MODEL_PATH, "rb") as f:
                model = pickle.load(f)
            logger.info("✓ Model loaded successfully")
            return True
        else:
            logger.error(f"✗ Model file not found at {MODEL_PATH}")
            logger.error("Run 'python train_model.py' first")
            return False
    except Exception as e:
        logger.error(f"✗ Error loading model: {e}")
        return False

# Load model on startup
if not load_model():
    logger.warning("⚠ Starting server without model (predictions will fail)")

# ============================================================================
# API Endpoints
# ============================================================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    Returns: JSON with server status
    """
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "model_loaded": model is not None
    }), 200

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Predict win probability for a given match state
    
    Request JSON:
    {
        "batting_team": "Mumbai Indians",
        "bowling_team": "Kolkata Knight Riders",
        "runs_left": 45,
        "balls_left": 12,
        "wickets_left": 5
    }
    
    Response JSON:
    {
        "win_probability": 0.75,
        "confidence": 0.92,
        "prediction": "likely_win",
        "message": "Mumbai Indians has 75% chance to win"
    }
    """
    
    try:
        # Check if model is loaded
        if model is None:
            return jsonify({
                "error": "Model not loaded",
                "message": "ML model is not available. Please train the model first."
            }), 503
        
        # Get request data
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['batting_team', 'bowling_team', 'runs_left', 'balls_left', 'wickets_left']
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            return jsonify({
                "error": "Missing fields",
                "missing_fields": missing_fields,
                "required_fields": required_fields
            }), 400
        
        # Extract features
        batting_team = data['batting_team']
        bowling_team = data['bowling_team']
        runs_left = float(data['runs_left'])
        balls_left = float(data['balls_left'])
        wickets_left = float(data['wickets_left'])
        
        # Validate input ranges
        if runs_left < 0 or balls_left <= 0 or wickets_left < 0 or wickets_left > 10:
            return jsonify({
                "error": "Invalid input values",
                "message": "runs_left >= 0, balls_left > 0, 0 <= wickets_left <= 10"
            }), 400
        
        # Prepare input for model
        import pandas as pd
        
        # Create feature dataframe matching model training format
        # Model expects: batting_team, bowling_team, runs_left, balls_left, wickets_left
        X = pd.DataFrame({
            'batting_team': [batting_team],
            'bowling_team': [bowling_team],
            'runs_left': [runs_left],
            'balls_left': [balls_left],
            'wickets_left': [wickets_left]
        })
        
        logger.info(f"Input features: {X.to_dict('records')[0]}")
        logger.info(f"Model type: {type(model).__name__}")
        
        # Make prediction using the trained ML model
        # The model is a sklearn Pipeline with preprocessor and LogisticRegression
        try:
            # Check if model has predict_proba (classification model)
            if hasattr(model, 'predict_proba'):
                logger.info("Using predict_proba() from ML model")
                probabilities = model.predict_proba(X)
                logger.info(f"Raw probabilities: {probabilities}")
                # Get probability of winning (class 1)
                win_prob = float(probabilities[0, 1])
            else:
                # Fallback: use predict method
                logger.info("Using predict() from ML model")
                prediction = model.predict(X)[0]
                win_prob = float(prediction)
            
            # Ensure probability is in valid range [0, 1]
            win_prob = max(0.0, min(1.0, win_prob))
            confidence = max(win_prob, 1 - win_prob)
            
            logger.info(f"✓ ML MODEL PREDICTION: {win_prob:.4f}, Confidence: {confidence:.4f}")
            
        except Exception as pred_error:
            logger.error(f"ML Model prediction failed: {pred_error}")
            logger.error(f"Input shape: {X.shape}, Input dtypes: {X.dtypes.to_dict()}")
            logger.error(traceback.format_exc())
            raise
        
        # Determine prediction label
        if win_prob >= 0.7:
            prediction = "likely_win"
        elif win_prob >= 0.5:
            prediction = "slight_win"
        elif win_prob >= 0.3:
            prediction = "slight_loss"
        else:
            prediction = "likely_loss"
        
        logger.info(f"Prediction: {batting_team} vs {bowling_team} - {win_prob:.2%}")
        
        return jsonify({
            "success": True,
            "prediction": prediction,
            "win_probability": round(win_prob, 4),
            "loss_probability": round(1 - win_prob, 4),
            "confidence": round(confidence, 4),
            "message": f"{batting_team} has {win_prob*100:.1f}% chance to win",
            "model_source": "ML Model (live_model.pkl)",
            "model_type": "sklearn Pipeline (LogisticRegression)",
            "match_state": {
                "batting_team": batting_team,
                "bowling_team": bowling_team,
                "runs_left": runs_left,
                "balls_left": balls_left,
                "wickets_left": wickets_left
            }
        }), 200
    
    except ValueError as e:
        logger.error(f"ValueError: {e}")
        return jsonify({
            "error": "Invalid input format",
            "message": f"Input values must be numeric: {str(e)}",
            "details": traceback.format_exc()
        }), 400
    
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        logger.error(traceback.format_exc())
        return jsonify({
            "error": "Internal server error",
            "message": str(e),
            "type": type(e).__name__,
            "details": traceback.format_exc()
        }), 500

@app.route('/api/teams', methods=['GET'])
def get_teams():
    """
    Get list of all IPL teams
    Returns: JSON with list of teams
    """
    teams = [
        "Mumbai Indians",
        "Chennai Super Kings",
        "Royal Challengers Bangalore",
        "Kolkata Knight Riders",
        "Delhi Capitals",
        "Rajasthan Royals",
        "Sunrisers Hyderabad",
        "Kings XI Punjab",
        "Lucknow Super Giants",
        "Gujarat Titans"
    ]
    return jsonify({"teams": teams}), 200

@app.route('/', methods=['GET'])
def home():
    """Home endpoint with API documentation"""
    return jsonify({
        "name": "IPL Live Match Win Predictor",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "health": "GET /api/health",
            "predict": "POST /api/predict",
            "teams": "GET /api/teams"
        },
        "documentation": "See README.md for full API documentation"
    }), 200

# ============================================================================
# Error Handlers
# ============================================================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {error}")
    return jsonify({"error": "Internal server error"}), 500

# ============================================================================
# Main
# ============================================================================

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
