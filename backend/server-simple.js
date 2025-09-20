const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Simple in-memory storage for testing
let users = [
  { id: 1, name: 'Admin User', email: 'admin@test.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'John Alumni', email: 'alumni@test.com', password: 'alumni123', role: 'alumni' },
  { id: 3, name: 'Jane Student', email: 'student@test.com', password: 'student123', role: 'student' }
];

// Register endpoint
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, role, graduationYear, department } = req.body;
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password, // In production, hash this
      role: role || 'student',
      graduationYear,
      department
    };
    
    users.push(newUser);
    
    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ 
      token: 'mock-jwt-token', 
      user: userWithoutPassword 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    res.json({ 
      token: 'mock-jwt-token', 
      user: userWithoutPassword 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

const PORT = 7082;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Test users:');
  console.log('Admin: admin@test.com / admin123');
  console.log('Alumni: alumni@test.com / alumni123');
  console.log('Student: student@test.com / student123');
});