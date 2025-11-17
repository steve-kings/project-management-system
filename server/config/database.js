import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.error('Server will continue running, but database operations will fail.');
        console.error('Please check:');
        console.error('1. Your IP is whitelisted in MongoDB Atlas');
        console.error('2. Your MongoDB credentials are correct');
        console.error('3. Your network connection is stable');
    }
};

export default connectDB;
