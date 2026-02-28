"""
Configuration Settings
=====================
Centralized configuration for backend application
"""

import os
from pathlib import Path

# Base directories
BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data" / "raw"
MODEL_DIR = BASE_DIR / "models"
PLOTS_DIR = BASE_DIR / "plots"

# Create directories if they don't exist
DATA_DIR.mkdir(parents=True, exist_ok=True)
MODEL_DIR.mkdir(parents=True, exist_ok=True)
PLOTS_DIR.mkdir(parents=True, exist_ok=True)

# Data files
DELIVERIES_FILE = DATA_DIR / "deliveries.csv"
MATCHES_FILE = DATA_DIR / "matches.csv"

# Model files
MODEL_PATH = MODEL_DIR / "live_model.pkl"
SCALER_PATH = MODEL_DIR / "scaler.pkl"

# Flask configuration
FLASK_ENV = os.getenv("FLASK_ENV", "development")
DEBUG = FLASK_ENV == "development"
TESTING = FLASK_ENV == "testing"

# CORS configuration
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://localhost:3000",
    "https://localhost:5000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5000",
    os.getenv("FRONTEND_URL", "http://localhost:3000")
]

# API configuration
API_VERSION = "1.0.0"
API_PREFIX = "/api"

# Model configuration
MODEL_CONFIG = {
    "test_size": 0.2,
    "random_state": 42,
    "class_weight": "balanced",
    "max_iter": 3000
}

# Logging configuration
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

# Team names
IPL_TEAMS = [
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

# Feature configuration
FEATURES = {
    "categorical": ["batting_team", "bowling_team"],
    "numerical": ["runs_left", "balls_left", "wickets_left"]
}

# Prediction thresholds
PREDICTION_THRESHOLDS = {
    "likely_win": 0.7,
    "slight_win": 0.5,
    "slight_loss": 0.3,
    "likely_loss": 0.0
}

print("Configuration loaded successfully")
