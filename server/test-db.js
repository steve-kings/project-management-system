import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing MongoDB connection...');
console.log('Connection string:', process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@'));

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log('Host:', mongoose.connection.host);
    console.log('Database:', mongoose.connection.name);
    process.exit(0);
})
.catch((error) => {
    console.error('❌ MongoDB Connection Failed:');
    console.error('Error:', error.message);
    console.error('\nPlease check:');
    console.error('1. Your IP is whitelisted in MongoDB Atlas (Network Access)');
    console.error('2. Database user credentials are correct');
    console.error('3. Database user has proper permissions');
    process.exit(1);
});
