import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    console.log("MONGO URI ", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
export default connectDB;