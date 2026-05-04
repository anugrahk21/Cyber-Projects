# 🔐 VaultGuard: Password Security Tool

> *Your personal cybersecurity guardian for creating and analyzing passwords!* 🛡️

A comprehensive Python-based password strength analyzer, secure password generator, and a **Premium React Web Application** designed for cybersecurity learning and real-world application.

---

## ✨ Features

### 💻 Web Interface (VaultGuard)
- **Modern Full-Stack Architecture**: Built with Vite + React for the frontend and Python FastAPI for the backend.
- **Premium UI/UX**: Features a sleek glassmorphism design, dark/light mode toggle, and smooth animations using Vanilla CSS.
- **Vercel Ready**: Pre-configured to deploy effortlessly to Vercel using Python Serverless Functions.

### 🧠 Core Engine Features
🎯 **Password Strength Analyzer**
- Smart scoring system (0-100 points)
- Real-time feedback and recommendations
- Entropy calculation for randomness measurement
- Weak pattern detection (sequences, keyboard walks, etc.)

🔑 **Secure Password Generator**
- Cryptographically secure random generation using `secrets` module
- Customizable length and character sets
- Automatic ambiguous character filtering (no more 0/O confusion!)
- Guaranteed character variety enforcement

🚨 **Breach Detection (Pwned Passwords API)**
- Real breach checking using the free Pwned Passwords k-anonymity API
- Only the first 5 SHA-1 hash chars are sent (privacy-preserving)
- No API key required

---

## 🚀 Quick Start

You can use this tool in two ways: via the **Command Line** or the **Web Interface**.

### Option A: Command Line Interface
```bash
cd P1
python password_tool.py
```
**Requirements:** Python 3.6+ (no external dependencies needed!)

### Option B: Web Interface (Local Development)
You will need to run both the React frontend and the Python backend simultaneously.

**1. Start the React Frontend:**
```bash
cd P1/frontend
npm install
npm run dev
```

**2. Start the Python Backend:**
Open a *second* terminal window:
```bash
cd P1/frontend
pip install -r requirements.txt
pip install uvicorn
uvicorn api.index:app --reload --port 8000
```
*(The React app automatically proxies API requests to port 8000!)*

---

## ☁️ Deploying to Vercel

This project is pre-configured for Vercel deployment!
1. Push this repository to GitHub.
2. Log into Vercel and import your repository.
3. In the project settings, set the **Root Directory** to `frontend`.
4. Vercel will automatically build the Vite app and deploy the `api/` folder as Python Serverless Functions.
5. Click **Deploy**.

---

## 🎮 How to Use (CLI)

When you run the terminal tool, you'll see this interactive menu:

```text
============= Password Security Tool =============
=== Made by Anugrah K (github.com/anugrahk21) ===
1. Check password strength
2. Generate secure password  
3. Check password breach status
4. Exit
```

---

## 🧪 Test Cases

Try these passwords to see the tool in action (works on both Web and CLI):

| Password | Expected Strength | Why? |
|----------|------------------|------|
| `password123` | 🔴 Very Weak | Common + predictable |
| `MyP@ssw0rd` | 🟡 Medium | Good variety, but common word |
| `Tr0ub4dor&3` | 🟢 Strong | Mixed case, numbers, symbols |
| `J8#mK9$pL2@qR5` | 🟢 Very Strong | Random, long, all types |

---

## 🔬 Security Learning Points

### 🎲 **Entropy Explained**
- **What**: Measure of password unpredictability
- **Formula**: `length × log₂(character_set_size)`
- **Example**: 12-char password with all types = ~78 bits
- **Goal**: 60+ bits for strong security

### 🎨 **Character Sets**
- **Lowercase** (a-z): 26 characters
- **Uppercase** (A-Z): 26 characters  
- **Digits** (0-9): 10 characters
- **Symbols** (!@#$...): 32 characters
- **Total Pool**: 94 possible characters

### 🚫 **Common Weaknesses Detected**
- Sequential patterns (`123456`, `abcdef`)
- Keyboard walks (`qwerty`, `asdf`)
- Repeated characters (`aaaaaa`, `111111`)
- Dictionary words in any case
- Common passwords from breach lists

---

## 🛠️ Code Architecture

```text
P1/
├── password_tool.py          # Standalone CLI tool
└── frontend/                 # React Web Application
    ├── api/                  # Python Backend (Vercel Serverless)
    │   ├── index.py          # FastAPI Server
    │   └── password_tool.py  # Core Engine Module
    └── src/                  # React Source Code
```

**Key Technologies:**
- `re` module for pattern matching
- `secrets` module for cryptographic randomness
- `string` module for character set definitions
- `math` module for entropy calculations

---

## 🎯 Future Enhancement Ideas

1. **⏱️ Crack Time Estimation**: Show estimated time to break password
2. **🔗 Passphrase Generator**: Create memorable word-based passwords
3. **⚡ Live Strength Meter**: UI updates instantly on every keystroke
4. **🔄 Password History**: Prevent password reuse
5. **📚 Dictionary Detection**: Check against common word lists

---

## 📝 License

Educational use - Feel free to modify and improve! 🎓

---

## 🔗 Connect with Me

- **GitHub**: [anugrahk21](https://github.com/anugrahk21)
- **LinkedIn**: [Anugrah-K](https://www.linkedin.com/in/anugrah-k/)
- **Email**: [anugrah.k910@gmail.com](mailto:anugrah.k910@gmail.com)

*Made with ❤️ for cybersecurity education*
