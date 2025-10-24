import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:8081', 'http://localhost:19006'], // Expo dev server ports
  credentials: true
}));
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Historify Backend is running!' });
});

// Import routes
import protectedRoutes from './routes/protected.js';

// API routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Protected routes (require authentication)
app.use('/api/protected', protectedRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/health`);
});
