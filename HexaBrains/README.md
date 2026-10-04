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

## Publish the static version with GitHub Pages

GitHub Pages does not run Flask or Python. This repository includes a static version in the root-level `docs/` directory that calculates the same model estimate in the visitor's browser.

1. Push the `docs/` directory to the `main` branch.
2. In the repository on GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/docs`, then save.
5. Wait for the Pages deployment to complete. The site URL is shown on the Pages settings screen and is usually `https://<your-account>.github.io/HexaBrain/`.

For GitHub Pages, use the repository's `docs/` folder as the publishing source. Do not set `HexaBrains/` as the Pages source; that directory contains the Flask app, not the static site.

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
