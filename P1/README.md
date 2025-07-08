# Password Security Tool

A Python-based password strength checker and secure password generator for cybersecurity learning.

## Features
- Password strength analysis with scoring (0-100)
- Secure random password generation  
- Character variety checking
- Entropy calculation
- Weak pattern detection
- Future: Breach checking via HaveIBeenPwned API

## Setup & Run
```bash
cd P2
python password_tool.py
```

## TODO Sections for You to Complete

### 1. Character Type Scoring (Line ~40)
Complete the character variety checks:
```python
# Add points for each character type:
if has_lower:
    score += 15
if has_upper:
    score += 15  
if has_digit:
    score += 15
if has_special:
    score += 20

# Add feedback for missing types:
if not has_lower:
    feedback.append("Add lowercase letters")
# ... continue for other types
```

### 2. Entropy Calculation (Line ~70)
Calculate password randomness:
```python
import math

char_set_size = 0
if has_lower: char_set_size += 26
if has_upper: char_set_size += 26  
if has_digit: char_set_size += 10
if has_special: char_set_size += 32

entropy = length * math.log2(char_set_size) if char_set_size > 0 else 0
```

### 3. Remove Ambiguous Characters (Line ~110)
Filter out confusing characters:
```python
if exclude_ambiguous:
    lowercase = lowercase.replace('l', '')
    uppercase = uppercase.replace('O', '').replace('I', '')
    digits = digits.replace('0', '').replace('1', '')
```

### 4. Secure Password Generation (Line ~130)
Ensure character variety:
```python
# Guarantee at least one from each category
password.append(secrets.choice(lowercase))
password.append(secrets.choice(uppercase))
password.append(secrets.choice(digits))
if include_symbols:
    password.append(secrets.choice(symbols))

# Fill remaining length
for _ in range(length - len(password)):
    password.append(secrets.choice(char_pool))

# Shuffle for security
secrets.SystemRandom().shuffle(password)
```

### 5. Breach Check Structure (Line ~150)
Return proper format:
```python
return {
    'is_breached': False,
    'breach_count': 0, 
    'message': "Breach check not implemented yet"
}
```

## Security Learning Points
- **Entropy**: Measure of password randomness (higher = better)
- **Character Variety**: Mix of lowercase, uppercase, digits, symbols
- **Length**: Longer passwords exponentially harder to crack
- **Patterns**: Avoid keyboard walks, sequences, common words
- **Breaches**: Check if password appeared in known data breaches

## Enhancement Ideas
1. Add dictionary word detection
2. Implement real HaveIBeenPwned API integration
3. Add password history (avoid reuse)
4. Create GUI version
5. Add password strength visualization
6. Implement custom character sets

## Testing
Try these test cases:
- Weak: `password123`
- Medium: `MyP@ssw0rd`  
- Strong: `Tr0ub4dor&3`
- Very Strong: `correct-horse-battery-staple-2024!`
