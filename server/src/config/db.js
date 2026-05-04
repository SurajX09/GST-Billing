import mongoose from 'mongoose';

export default async function connectDB(uri) {
  if (!uri) throw new Error('MONGO_URI not provided');
  await mongoose.connect(uri, {
    // useNewUrlParser, useUnifiedTopology default in Mongoose 7+
  });
  console.log('MongoDB connected');
}
