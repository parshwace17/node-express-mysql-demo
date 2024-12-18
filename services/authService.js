const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret, jwtExpiration } = require('../config/config');

// Simulating a user for the sake of this example
const mockUser = {
  id: 1,
  username: 'user',
  password: '$2a$10$DwVGxjA1Ac4uMbDi41fL6uiUlwpaZecbVNBHhVkmTiEPyYqFrQy9i', // hashed password for 'password123'
};

const authenticate = async (username, password) => {
  if (username === mockUser.username) {
    const isMatch = await bcrypt.compare(password, mockUser.password);
    if (isMatch) {
      const token = jwt.sign({ id: mockUser.id, username: mockUser.username }, jwtSecret, { expiresIn: jwtExpiration });
      return token;
    }
    throw new Error('Invalid credentials');
  }
  throw new Error('Invalid credentials');
};

module.exports = {
  authenticate,
};
