# VaultGuard - Password Security Tool 🔒

VaultGuard is a full-stack web application designed to help users analyze, generate, and verify the security of their passwords. The project features a premium React frontend and a Python FastAPI backend.

## Features
- **Strength Analysis**: Evaluates password strength, calculating entropy and providing actionable feedback.
- **Secure Generator**: Generates cryptographically secure passwords based on custom parameters (length, symbols, ambiguous characters).
- **Breach Check**: Uses the HaveIBeenPwned API (via k-anonymity) to securely check if a password has been compromised in a known data breach without exposing the actual password.
- **Premium Design**: Built with vanilla CSS featuring a responsive layout, glassmorphism, and seamless light/dark mode toggling.

## Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Python (FastAPI)
- **Deployment Strategy**: Vercel (Static Frontend + Serverless Python Functions)

## How to Run Locally

You will need to run both the React frontend and the Python backend simultaneously during local development.

### 1. Start the React Frontend
Open a terminal in the `frontend` directory:
```bash
npm install
npm run dev
```

### 2. Start the Python Backend
Open a *second* terminal in the `frontend` directory:
```bash
# Optional: Create a virtual environment first
# python -m venv venv
# venv\Scripts\activate

pip install -r requirements.txt
pip install uvicorn

# Start the FastAPI server
uvicorn api.index:app --reload --port 8000
```
*(The React app is configured to automatically proxy API requests to `http://127.0.0.1:8000/api` via `vite.config.js`)*

## Deploying to Vercel

This project is pre-configured for **Vercel** deployment!
1. Push this repository to GitHub.
2. Log into Vercel and import your repository.
3. In the project settings, set the **Root Directory** to `frontend`.
4. Vercel will automatically build the Vite app and deploy the `api/` folder as Python Serverless Functions based on the `vercel.json` and `requirements.txt` configuration.
5. Click **Deploy**.
