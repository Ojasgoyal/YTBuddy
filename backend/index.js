import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    }
  })
  .catch((err) => {
    console.error(`MongoDB connection failed ${err}`);
  })

export default app;