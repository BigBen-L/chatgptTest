import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

mongoose.connection.on('error', () => {
  console.error('MongoDB connection error:');
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
