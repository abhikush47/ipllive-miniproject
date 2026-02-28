"""
Model Calibration & Evaluation
===============================
This script evaluates the trained model's calibration and generates
visualization plots to assess prediction reliability.

Usage:
    python calibration.py
"""

import pandas as pd
import pickle
import matplotlib.pyplot as plt
import os
from sklearn.calibration import calibration_curve
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns

print("=" * 60)
print("IPL Model Calibration & Evaluation")
print("=" * 60)

# Ensure models directory exists
os.makedirs("plots", exist_ok=True)

# Load trained model
print("\n📂 Loading model...")
try:
    with open("models/live_model.pkl", "rb") as f:
        pipe = pickle.load(f)
    print("   ✓ Model loaded successfully")
except FileNotFoundError:
    print("   ✗ Error: Model not found. Run train_model.py first")
    exit(1)

# Load and preprocess data (same as training)
print("\n📂 Loading data...")
try:
    deliveries = pd.read_csv("data/raw/deliveries.csv")
    matches = pd.read_csv("data/raw/matches.csv")
    print(f"   ✓ Data loaded")
except FileNotFoundError as e:
    print(f"   ✗ Error: {e}")
    exit(1)

# Feature engineering (replicate training pipeline)
print("\n🎯 Engineering features...")
target_df = deliveries.groupby("match_id")["total_runs"].sum().reset_index()
target_df.rename(columns={"total_runs": "target"}, inplace=True)
deliveries = deliveries.merge(target_df, on="match_id")

deliveries["current_score"] = deliveries.groupby("match_id")["total_runs"].cumsum()
deliveries["balls_left"] = 120 - ((deliveries["over"] - 1) * 6 + deliveries["ball"])

deliveries["is_wicket"] = deliveries["player_dismissed"].notna().astype(int)
deliveries["wickets_fallen"] = deliveries.groupby("match_id")["is_wicket"].cumsum()
deliveries["wickets_left"] = 10 - deliveries["wickets_fallen"]

deliveries["runs_left"] = deliveries["target"] - deliveries["current_score"]

deliveries = deliveries.merge(
    matches[["id", "winner"]],
    left_on="match_id",
    right_on="id",
    how="left"
)

deliveries["batting_win"] = (
    deliveries["winner"] == deliveries["batting_team"]
).astype(int)

df = deliveries[[
    "batting_team", "bowling_team", "runs_left", "balls_left", "wickets_left", "batting_win"
]]

df = df.dropna()
df = df[(df["balls_left"] > 0) & (df["runs_left"] >= 0)]

X = df.drop("batting_win", axis=1)
y = df["batting_win"]

# Create same test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"   ✓ Test set: {len(X_test)} samples")

# Get predictions
print("\n🔮 Generating predictions...")
y_pred = pipe.predict(X_test)
y_pred_proba = pipe.predict_proba(X_test)[:, 1]
print("   ✓ Predictions complete")

# Calibration curve
print("\n📊 Computing calibration curve...")
prob_true, prob_pred = calibration_curve(
    y_test, y_pred_proba, n_bins=10, strategy="uniform"
)

fig, axes = plt.subplots(2, 2, figsize=(14, 10))
fig.suptitle("IPL Win Prediction Model - Calibration & Evaluation", fontsize=16, fontweight='bold')

# Plot 1: Calibration Curve
ax = axes[0, 0]
ax.plot(prob_pred, prob_true, marker='o', linewidth=2, markersize=8, label='Model')
ax.plot([0, 1], [0, 1], linestyle='--', linewidth=2, label='Perfect Calibration')
ax.fill_between(prob_pred, prob_true, prob_pred, alpha=0.2)
ax.set_xlabel("Predicted Probability", fontsize=11)
ax.set_ylabel("Actual Win Rate", fontsize=11)
ax.set_title("Calibration Curve", fontsize=12, fontweight='bold')
ax.legend()
ax.grid(alpha=0.3)
ax.set_xlim(0, 1)
ax.set_ylim(0, 1)

# Plot 2: Predicted Probability Distribution
ax = axes[0, 1]
ax.hist(y_pred_proba[y_test == 0], bins=30, alpha=0.6, label='Losses', color='red')
ax.hist(y_pred_proba[y_test == 1], bins=30, alpha=0.6, label='Wins', color='green')
ax.set_xlabel("Predicted Probability", fontsize=11)
ax.set_ylabel("Frequency", fontsize=11)
ax.set_title("Prediction Distribution", fontsize=12, fontweight='bold')
ax.legend()
ax.grid(alpha=0.3)

# Plot 3: Confusion Matrix
ax = axes[1, 0]
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=ax, cbar=False,
            xticklabels=['Loss', 'Win'], yticklabels=['Loss', 'Win'])
ax.set_xlabel("Predicted", fontsize=11)
ax.set_ylabel("Actual", fontsize=11)
ax.set_title("Confusion Matrix", fontsize=12, fontweight='bold')

# Plot 4: Prediction Confidence
ax = axes[1, 1]
max_probs = [max(p, 1-p) for p in y_pred_proba]
ax.hist(max_probs, bins=30, color='steelblue', edgecolor='black')
ax.set_xlabel("Confidence (Max Probability)", fontsize=11)
ax.set_ylabel("Frequency", fontsize=11)
ax.set_title("Prediction Confidence Distribution", fontsize=12, fontweight='bold')
ax.grid(alpha=0.3, axis='y')

plt.tight_layout()
plot_path = "plots/calibration_report.png"
plt.savefig(plot_path, dpi=300, bbox_inches='tight')
print(f"   ✓ Plot saved to {plot_path}")

# Print detailed metrics
print("\n" + "=" * 60)
print("📊 Detailed Classification Report")
print("=" * 60)
print(classification_report(y_test, y_pred, target_names=['Loss', 'Win']))

print("\n" + "=" * 60)
print("✅ Calibration evaluation complete!")
print("=" * 60)
