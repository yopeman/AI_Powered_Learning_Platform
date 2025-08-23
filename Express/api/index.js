import app from '../app.js';

// Export the Express app as a serverless function
export default async (req, res) => {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Pass the request to Express
  return app(req, res);
};