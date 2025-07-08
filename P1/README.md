# 🔐 Password Security Tool

> *Your personal cybersecurity guardian for creating and analyzing passwords!* 🛡️

A comprehensive Python-based password strength analyzer and secure password generator designed for cybersecurity learning and real-world application.

---

## ✨ Features

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

🚨 **Breach Detection (Demo)**
- Simulated breach checking system
- Educational demonstration of HaveIBeenPwned-style functionality
- Pattern-based detection for learning purposes

---

## 🚀 Quick Start

```bash
cd P1
python password_tool.py
```

**Requirements:** Python 3.6+ (no external dependencies needed!)

---

## 🎮 How to Use

When you run the tool, you'll see this interactive menu:

```
============= Password Security Tool =============
=== Made by Anugrah K (github.com/anugrahk21) ===
1. Check password strength
2. Generate secure password  
3. Check password breach status
4. Exit
```

### 1️⃣ Password Strength Checker

Enter any password and get:
- **Strength Rating**: Very Weak → Very Strong
- **Numerical Score**: 0-100 points
- **Entropy Value**: Bits of randomness
- **Smart Recommendations**: Personalized improvement tips

**Scoring System:**
- 📏 **Length Points**: Up to 25 points (12+ chars = max points)
- 🎨 **Character Variety**: 15-20 points per type (lower, UPPER, 123, !@#)
- 🏆 **Variety Bonus**: +10 points for using all character types
- 🧠 **Entropy Bonus**: +10 points for high randomness (60+ bits)
- ⚠️ **Penalties**: -40 for common passwords, -20 for weak patterns

### 2️⃣ Secure Password Generator

Create bulletproof passwords with options:
- **Custom Length**: Default 12, recommend 16+ for high security
- **Symbol Inclusion**: Special characters for extra strength
- **Ambiguous Filtering**: Removes confusing chars (0,O,l,1,I)

**Security Features:**
- Uses `secrets.SystemRandom()` for cryptographic randomness
- Guarantees at least one character from each selected type
- Final shuffle for unpredictable character placement

### 3️⃣ Breach Check (Demo/Educational)

**🎓 Learning Feature - Not Real Breach Data!**

This simulates how real breach checking works:

**How Our Demo Works:**
1. Takes first 4 characters of your password as "hash prefix"
2. Checks against demo breach database: `["abc", "def", "1234", "5678"]`
3. Returns simulated breach status and count

**Real-World Implementation Would:**
1. Hash password with SHA-1
2. Send first 5 chars to HaveIBeenPwned API
3. Check if remaining hash appears in response
4. Never send actual password over internet!

---

## 🧪 Test Cases

Try these passwords to see the tool in action:

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

```
PasswordTool Class
├── __init__()           # Initialize weak password & pattern lists
├── check_password_strength()  # Main analysis engine
├── generate_password()       # Secure password creation
└── check_password_breach()   # Demo breach simulation
```

**Key Technologies:**
- `re` module for pattern matching
- `secrets` module for cryptographic randomness
- `string` module for character set definitions
- `math` module for entropy calculations
- `hashlib` module for hashing passwords (not used in demo)

---

## 🎯 Future Enhancement Ideas

1. **🌐 Real API Integration**: Connect to actual HaveIBeenPwned API
2. **📚 Dictionary Detection**: Check against common word lists
3. **📊 Visual Strength Meter**: GUI with real-time strength visualization
4. **🔄 Password History**: Prevent password reuse
5. **🎨 Custom Character Sets**: User-defined character pools
6. **⏱️ Crack Time Estimation**: Show estimated time to break password
7. **🔗 Passphrase Generator**: Create memorable word-based passwords

---

## 🎓 Educational Value

This tool demonstrates core cybersecurity concepts:
- **Password Entropy & Randomness**
- **Secure Random Number Generation**
- **Pattern Recognition & Analysis**
- **API Design Patterns (breach checking)**
- **User Experience in Security Tools**

Perfect for students learning about:
- Cryptographic security principles
- Python security programming
- Password policy development
- Security tool design

---

## 📝 License

Educational use - Feel free to modify and improve! 🎓

---

## 🔗 Connect with Me

- **GitHub**: [anugrahk21](https://github.com/anugrahk21)
- **LinkedIn**: [Anugrah-K](https://www.linkedin.com/in/anugrah-k/)
- **Email**: [anugrah.k910@gmail.com](mailto:anugrah.k910@gmail.com)

*Made with ❤️ for cybersecurity education*
