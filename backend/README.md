# Historify Backend

Express.js backend API for the Historify mobile app.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   - `PORT` - Server port (default: 3001)
   - `NODE_ENV` - Environment (development/production)

3. **Run the server:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Public Routes
- `GET /health` - Health check
- `GET /api/test` - Test endpoint

### API Routes
- `GET /api/protected/profile` - Get user profile (placeholder)
- `GET /api/protected/data` - Get user data (placeholder)
- `POST /api/protected/create` - Create new item (placeholder)

## Frontend Integration

In your React Native app, make API requests like this:

```javascript
const fetchUserData = async () => {
  const response = await fetch('http://localhost:3001/api/protected/profile', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const data = await response.json();
  return data;
};
```

## Authentication

Authentication has been temporarily removed. You can add it back later when you're ready to implement user authentication.

## Development

- Server runs on `http://localhost:3001`
- CORS is configured for Expo development ports
- Use `nodemon` for auto-restart during development
