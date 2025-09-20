const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ MongoDB Connection Test Successful');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    console.log(`🔗 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
    
    // Test creating a collection
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: 'connection', timestamp: new Date() });
    console.log('✅ Test document inserted successfully');
    
    await testCollection.deleteOne({ test: 'connection' });
    console.log('✅ Test document deleted successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    console.error('💡 Make sure MongoDB is running on your system');
    console.error('💡 Check your connection string in .env file');
    process.exit(1);
  }
};

connectDB();