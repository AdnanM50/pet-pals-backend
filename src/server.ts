import app from './app';
import { connectDB } from './config/db';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Ensure the uploads/products directory exists
    const uploadDir = path.join(__dirname, 'uploads/products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
