const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully');
  console.log(`📍 Database: ${mongoose.connection.name}`);
  console.log(`🔗 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
})
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
  process.exit(1);
});

mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose disconnected from MongoDB');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/alumni', require('./routes/alumni'));
app.use('/api/events', require('./routes/events'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/internships', require('./routes/internships'));
app.use('/api/mentorship', require('./routes/mentorship'));
app.use('/api/messages', require('./routes/messages'));

const PORT = process.env.PORT || 7082;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));