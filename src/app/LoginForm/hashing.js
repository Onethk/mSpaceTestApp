// Import a cryptographic library for hashing
const crypto = require('crypto');

// Function to generate a 26-digit hash from the phone number
export const generateHash = (phoneNumber) => {
    // Generate a hash using SHA-256 algorithm
    const hash = crypto.createHash('sha256');
    // Update the hash with the phone number
    hash.update(phoneNumber.toString());
    // Get the hashed value as a hexadecimal string
    const hashedPhoneNumber = hash.digest('hex');
    // Take the first 26 characters of the hash to get a 26-digit hash
    return hashedPhoneNumber.substring(0, 26);
};
