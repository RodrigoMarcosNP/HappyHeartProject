const CryptoJS = require('crypto-js');

// Function to generate the hash
const generateHash = (password, salt, iterations) => {
    const hashedPassword = CryptoJS.PBKDF2(password, salt, { keySize: 256 / 32, iterations }).toString(CryptoJS.enc.Hex);
    return hashedPassword;
};

// Parameters
const password = "admin123@";
const salt = "10";  // Fixed salt
const iterations = 10;  // Reduced iterations

// Generate the hash
const hashedPassword = generateHash(password, salt, iterations);
console.log(hashedPassword);
