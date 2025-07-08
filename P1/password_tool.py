import re # Regular expressions for pattern matching
import random # Random for generating random characters
import string # String module for character sets
import secrets # Secure random number generator
import hashlib # For hashing passwords to check against breaches

class PasswordTool:
    def __init__(self):
        # Common weak passwords list (add more if needed)
        self.weak_passwords = [
            "password", "123456", "password123", "admin", "qwerty", 
            "letmein", "welcome", "monkey", "dragon", "master"
        ]
        
        # Common patterns to avoid
        self.weak_patterns = [
            r"^(.)\1+$",  # All same character (111111, aaaaaa)
            r"123456",    # Sequential numbers
            r"abcdef",    # Sequential letters
            r"qwerty",    # Keyboard patterns
        ]

    def check_password_strength(self, password):
        """
        Analyze password strength and return score with feedback
        Score: 0-100 (0=very weak, 100=very strong)
        """
        score = 0
        feedback = []
        
        # Length check
        length = len(password)
        if length >= 12:
            score += 25
        elif length >= 8:
            score += 15
            feedback.append("Consider using 12+ characters for better security")
        else:
            feedback.append("Password too short! Use at least 8 characters")
        
        # Character variety checks
        has_lower = bool(re.search(r'[a-z]', password))
        has_upper = bool(re.search(r'[A-Z]', password))
        has_digit = bool(re.search(r'\d', password))
        has_special = bool(re.search(r'[!@#$%^&*(),.?":{}|<>]', password))
        
        # Add points for each character type present
        variety_check=[0, 0, 0, 0]  # [lower, upper, digit, special]
        # has_lower: add 15 points if True
        if has_lower:
            score += 15
            variety_check[0] = 1
        else:
            feedback.append("Add lowercase letters")
        if has_upper:  # Changed from elif to if
            score += 15
            variety_check[1] = 1
        else:
            feedback.append("Add uppercase letters")
        if has_digit:  # Changed from elif to if
            score += 15
            variety_check[2] = 1
        else:
            feedback.append("Add digits")
        if has_special:  # Changed from elif to if
            score += 20
            variety_check[3] = 1
        else:
            feedback.append("Add special characters")
        
        # Check if all character types are present
        if all(variety_check):  # If all types are present
            score += 10
        else:
            feedback.append("Include at least one lowercase, uppercase, digit, and special character")
        
        
        # Check against common weak passwords
        if password.lower() in self.weak_passwords:
            score = max(0, score - 40)
            feedback.append("This is a commonly used weak password!")
        
        # Check for weak patterns
        for pattern in self.weak_patterns:
            if re.search(pattern, password, re.IGNORECASE):
                score = max(0, score - 20)
                feedback.append("Avoid simple patterns and sequences")
                break
        
        # Calculate password entropy (bits of randomness)
        # Formula: length * log2(character_set_size)
        # Where character_set_size depends on what types are used:
        # lowercase: 26, uppercase: 26, digits: 10, special: 32
        
        import math
        char_set_size = 0
        if has_lower:
            char_set_size += 26
        if has_upper:
            char_set_size += 26
        if has_digit:
            char_set_size += 10
        if has_special:
            char_set_size += 32
        
        if char_set_size > 0:
            entropy = length * math.log2(char_set_size)
        else:
            entropy = 0
            feedback.append("Increase password length or variety for better entropy")
        # Bonus points for high entropy
        if entropy > 60:
            score += 10
        
        # Determine strength level
        if score >= 80:
            strength = "Very Strong"
        elif score >= 60:
            strength = "Strong"
        elif score >= 40:
            strength = "Medium"
        elif score >= 20:
            strength = "Weak"
        else:
            strength = "Very Weak"
        
        return {
            'score': min(100, score),
            'strength': strength,
            'entropy': entropy,
            'feedback': feedback
        }

    def generate_password(self, length=12, include_symbols=True, exclude_ambiguous=True):
        """
        Generate a cryptographically secure random password
        """
        # Define character sets
        lowercase = string.ascii_lowercase
        uppercase = string.ascii_uppercase
        digits = string.digits
        symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
        
        # Remove ambiguous characters if requested
        if exclude_ambiguous:
            # Remove ambiguous characters: 0, O, l, 1, I
            # Update the character sets to exclude these
            lowercase = lowercase.replace("l", "")
            uppercase = uppercase.replace("O", "")
            digits = digits.replace("0", "").replace("1", "")
            symbols = symbols.replace("I", "")
        
        # Build character pool
        char_pool = lowercase + uppercase + digits
        if include_symbols:
            char_pool += symbols
        
        # Generate password ensuring at least one from each category
        password = []
        
        # Complete password generation
        # Ensure at least one character from each required category:
        # 1. Add one random lowercase letter
        password.append(secrets.choice(lowercase))
        # 2. Add one random uppercase letter
        password.append(secrets.choice(uppercase))
        # 3. Add one random digit
        password.append(secrets.choice(digits))
        # 4. If symbols included, add one random symbol
        if include_symbols:
            password.append(secrets.choice(symbols))
        # 5. Fill remaining length with random characters from char_pool
        while len(password) < length:
            password.append(secrets.choice(char_pool))
        # 6. Shuffle the final password list
        secrets.SystemRandom().shuffle(password)
        # Return the generated password as a string
        return ''.join(password)

    def check_password_breach(self, password):
        """
        Check if password appears in known breaches using SHA-1 hash
        (This is a simplified version - in real implementation, 
         you'd use HaveIBeenPwned API)
        """
        # Create SHA-1 hash of password
        sha1_hash = password
        
        # TODO: Complete this section
        # In a real implementation, you would:
        # 1. Take first 5 characters of the hash
        # 2. Query HaveIBeenPwned API with these 5 chars
        # 3. Check if remaining hash appears in response
        # For now, just return a mock response
        
        # YOUR CODE HERE - Return a dictionary with:
        # 'is_breached': False (for now)
        # 'breach_count': 0 (for now)
        # 'message': "Breach check not implemented yet"

        breached_passwords = [sha1_hash[:4] ,sha1_hash[5:]]
        check_string = sha1_hash[:4]
        #simulated API response
        if check_string in breached_passwords:
            return {
                'is_breached': True,
                'breach_count': breached_passwords.count(check_string),
                'message': "Password found in breaches"
            }
        else:
            return {
                'is_breached': False,
                'breach_count': 0,
                'message': "Password not found in breaches"
            }

def main():
    """Main function to run the password tool"""
    tool = PasswordTool()
    
    while True:
        print("\n=== Password Security Tool ===")
        print("1. Check password strength")
        print("2. Generate secure password")
        print("3. Check password breach status")
        print("4. Exit")
        
        choice = input("\nEnter your choice (1-4): ").strip()
        
        if choice == '1':
            password = input("Enter password to check: ")
            result = tool.check_password_strength(password)
            
            print(f"\n--- Password Analysis ---")
            print(f"Strength: {result['strength']}")
            print(f"Score: {result['score']}/100")
            print(f"Entropy: {result['entropy']:.2f} bits")
            
            if result['feedback']:
                print("\nRecommendations:")
                for tip in result['feedback']:
                    print(f"- {tip}")
        
        elif choice == '2':
            try:
                length = int(input("Password length (default 12): ") or "12")
                include_symbols = input("Include symbols? (y/n, default y): ").lower() != 'n'
                exclude_ambiguous = input("Exclude ambiguous chars? (y/n, default y): ").lower() != 'n'
                
                password = tool.generate_password(length, include_symbols, exclude_ambiguous)
                print(f"\nGenerated password: {password}")
                
                # Auto-check the generated password
                result = tool.check_password_strength(password)
                print(f"Strength: {result['strength']} ({result['score']}/100)")
                
            except ValueError:
                print("Invalid input! Please enter a number for length.")
        
        elif choice == '3':
            password = input("Enter password to check for breaches: ")
            result = tool.check_password_breach(password)
            if result['is_breached']:
                print(f"{result['message']} {result['breach_count']}")
            else:
                print("Password not found in breaches.")
        
        elif choice == '4':
            print("Thanks for using Password Security Tool!")
            break
        
        else:
            print("Invalid choice! Please enter 1-4.")

if __name__ == "__main__":
    main()
