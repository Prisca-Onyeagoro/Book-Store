import mongoose, { Error } from 'mongoose';

const dbconn = async () => {
  const { connection } = await mongoose.connect(process.env.DATABASE_URL, {
    connectTimeoutMS: 20000,
  });
  try {
    if (connection.readyState === 1) {
      Promise.resolve(true);
      console.log('Database successfully connected');
    }
  } catch (error) {
    Promise.reject(false);

    throw Error('There was a problem connecting to the database');
  }
};

export default dbconn;
