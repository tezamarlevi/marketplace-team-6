import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to DB Cluster');
        })

        mongoose.connection.on('error', (err) => {
            console.error(err.message);
        })

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose Disconnected');
        })

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};