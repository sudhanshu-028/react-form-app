const express = require('express');
const cors = require('cors');
const fs = require('fs'); // optional: used to save to file

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // allow requests from your React app
app.use(express.json()); // parse JSON bodies

// Endpoint to receive form submissions
app.post('/submit', (req, res) => {
  const data = req.body;

  // Print to the terminal (command prompt) where this server runs:
  console.log('Received form submission:', data);

  // Optional: append to a local file for persistence
  try {
    const jsonLine = JSON.stringify({receivedAt: new Date().toISOString(), data}) + '\n';
    fs.appendFileSync('submissions.log', jsonLine, 'utf8');
  } catch (err) {
    console.error('Error writing to file:', err);
  }

  res.json({ status: 'ok', received: data });
});

// Simple health-check
app.get('/', (req, res) => res.send('Backend running'));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
