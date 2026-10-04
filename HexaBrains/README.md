# GradPath Admission Chance Estimator

A Flask application that estimates graduate admission chances from GRE, TOEFL, academic, and application profile inputs.

## Run locally (Windows PowerShell)

From the repository root:

```powershell
cd .\HexaBrains
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

Open <http://127.0.0.1:5000> in your browser. If PowerShell blocks virtual-environment activation, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in that terminal and activate again.

The app binds to `127.0.0.1` for local development. The development server is not intended for public production hosting.

## Run from GitHub

GitHub repositories store the project source; to run it in a browser, clone it locally or open it in GitHub Codespaces. Replace the example account and repository names below with your GitHub values. In Codespaces, use the same install and run commands, then open forwarded port `5000`.

```powershell
git clone https://github.com/your-account/your-repository.git
cd .\your-repository\HexaBrains
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

To publish your changes from the repository root:

```powershell
git add .
git commit -m "Improve admission predictor experience"
git push origin main
```

If your default branch is not `main`, replace `main` with its name. The dataset, `admission_predict.csv`, must stay beside `app.py`.
