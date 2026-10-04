import math
from pathlib import Path

from flask import Flask, render_template, request
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

DATA_PATH = Path(__file__).resolve().with_name("admission_predict.csv")
FEATURES = [
    "GRE Score",
    "TOEFL Score",
    "University Rating",
    "SOP",
    "LOR",
    "CGPA",
    "Research",
]
FIELD_LIMITS = {
    "gre": (260, 340),
    "toefl": (0, 120),
    "rating": (1, 5),
    "sop": (1, 5),
    "lor": (1, 5),
    "cgpa": (0, 10),
    "research": (0, 1),
}
FIELD_LABELS = {
    "gre": "GRE score",
    "toefl": "TOEFL score",
    "rating": "University rating",
    "sop": "Statement of purpose rating",
    "lor": "Letter of recommendation rating",
    "cgpa": "CGPA",
    "research": "Research experience",
}
INTEGER_FIELDS = {"gre", "toefl", "rating", "research"}

data = pd.read_csv(DATA_PATH)
data.columns = data.columns.str.strip()

X = data[FEATURES]
y = data['Chance of Admit']

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
model = LinearRegression()
model.fit(X_scaled, y)


@app.route("/", methods=["GET", "POST"])
def index():
    prediction = None
    error = None
    values = {field: "" for field in FIELD_LIMITS}

    if request.method == "POST":
        values.update(
            {field: request.form.get(field, "").strip() for field in FIELD_LIMITS}
        )
        features = []

        for field, limits in FIELD_LIMITS.items():
            try:
                value = float(values[field])
            except ValueError:
                error = f"Enter a valid number for {FIELD_LABELS[field]}."
                break

            if not math.isfinite(value):
                error = f"Enter a valid number for {FIELD_LABELS[field]}."
                break
            if not limits[0] <= value <= limits[1]:
                error = (
                    f"{FIELD_LABELS[field]} must be between "
                    f"{limits[0]} and {limits[1]}."
                )
                break
            if field in INTEGER_FIELDS and not value.is_integer():
                error = f"{FIELD_LABELS[field]} must be a whole number."
                break

            features.append(value)

        if error is None:
            feature_frame = pd.DataFrame([features], columns=FEATURES)
            scaled_features = scaler.transform(feature_frame)
            estimate = model.predict(scaled_features)[0] * 100
            prediction = min(max(float(estimate), 0.0), 100.0)

    return render_template(
        "index.html", prediction=prediction, error=error, values=values
    )

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
