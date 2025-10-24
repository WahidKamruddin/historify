import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();  

// All routes in this file require authentication
router.use(requireAuth);

// Example route - get user profile
router.get('/profile', (req, res) => {
  // TODO: Add authentication logic here later
  res.json({
    message: 'Profile endpoint (no auth for now)',
    user: {
      id: 'placeholder-user-id',
      email: 'placeholder@example.com'
    }
  });
});

// Example route - get user's data
router.get('/data', (req, res) => {
  // TODO: Add authentication logic here later
  res.json({
    message: 'Data endpoint (no auth for now)',
    userId: 'placeholder-user-id',
    data: [] // Replace with actual data fetching logic
  });
});

// Example route - create something
router.post('/create', (req, res) => {
  const { title, content } = req.body;
  
  // TODO: Add authentication logic here later
  res.json({
    message: 'Item created successfully (no auth for now)',
    userId: 'placeholder-user-id',
    item: { title, content }
  });
});


export default router;