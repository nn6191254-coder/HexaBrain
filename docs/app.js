"use strict";

const form = document.getElementById("prediction-form");
const errorMessage = document.getElementById("form-error");
const emptyResult = document.getElementById("empty-result");
const predictionResult = document.getElementById("prediction-result");
const scoreValue = document.getElementById("score-value");
const meter = document.getElementById("meter");
const meterFill = document.getElementById("meter-fill");
const resultStatus = document.getElementById("result-status");

const MODEL = {
    intercept: -1.2757250829969888,
    coefficients: [
        0.0018585064850102152,
        0.0027779723914195696,
        0.005941368040176787,
        0.001586137455766667,
        0.01685874235241868,
        0.11838505345773803,
        0.024307478582166055,
    ],
};

const fields = [
    { id: "gre", label: "GRE score", min: 260, max: 340, integer: true },
    { id: "toefl", label: "TOEFL score", min: 0, max: 120, integer: true },
    { id: "rating", label: "University rating", min: 1, max: 5, integer: true },
    { id: "sop", label: "Statement of purpose rating", min: 1, max: 5 },
    { id: "lor", label: "Letter of recommendation rating", min: 1, max: 5 },
    { id: "cgpa", label: "CGPA", min: 0, max: 10 },
    { id: "research", label: "Research experience", min: 0, max: 1, integer: true },
];

form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorMessage.hidden = true;
    errorMessage.textContent = "";

    const values = [];
    for (const field of fields) {
        const input = document.getElementById(field.id);
        const value = input.value === ""
            ? Number.NaN
            : field.id === "research"
                ? Number(input.value)
                : input.valueAsNumber;
        if (!Number.isFinite(value)) {
            showError(`Enter a valid number for ${field.label}.`);
            input.focus();
            return;
        }
        if (value < field.min || value > field.max) {
            showError(`${field.label} must be between ${field.min} and ${field.max}.`);
            input.focus();
            return;
        }
        if (field.integer && !Number.isInteger(value)) {
            showError(`${field.label} must be a whole number.`);
            input.focus();
            return;
        }
        values.push(value);
    }

    const estimate = MODEL.intercept + values.reduce(
        (total, value, index) => total + value * MODEL.coefficients[index],
        0,
    );
    const percentage = Math.min(100, Math.max(0, estimate * 100));

    scoreValue.textContent = percentage.toFixed(1);
    meter.setAttribute("aria-valuenow", percentage.toFixed(1));
    meterFill.style.width = `${percentage}%`;
    resultStatus.textContent = getResultMessage(percentage);
    emptyResult.hidden = true;
    predictionResult.hidden = false;
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
}

function getResultMessage(percentage) {
    if (percentage >= 75) {
        return "Your profile looks strong in this estimate. Keep building a balanced application.";
    }
    if (percentage >= 50) {
        return "Your profile is in a competitive range. A thoughtful application can help you stand out.";
    }
    return "Consider a balanced school list and look for ways to strengthen your application.";
}
