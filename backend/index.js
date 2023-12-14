const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());
// Route for /api/:date
app.get('/api/:date?', (req, res) => {
  let inputDate = req.params.date;

  // If date is empty, use the current time
  if (!inputDate) {
    inputDate = new Date().toISOString();
  }

  // Check if the input date is a valid Unix timestamp (numeric value)
  const isUnixTimestamp = /^\d+$/.test(inputDate);

  if (isUnixTimestamp) {
    const unixTimestamp = parseInt(inputDate, 10); // Convert to integer
    const utcDateString = new Date(unixTimestamp).toUTCString();

    // Send the JSON response with both unix and utc keys
    return res.json({ unix: unixTimestamp, utc: utcDateString });
  }

  // Validate if the input date is a valid date
  const timestamp = Date.parse(inputDate);

  if (isNaN(timestamp)) {
    return res.status(400).json({ error: 'Invalid date' });
  }

  // Convert the valid date to Unix timestamp in milliseconds
  const unixTimestamp = new Date(inputDate).getTime();

  // Format the UTC date string
  const utcDateString = new Date(unixTimestamp).toUTCString();

  // Send the JSON response with both unix and utc keys
  res.json({ unix: unixTimestamp, utc: utcDateString });
});


// // Route for /api/unix
// app.get('/api/1451001600000', (req, res) => {
//   // Use a predefined Unix timestamp (e.g., "Fri, 25 Dec 2015 00:00:00 GMT")
//   const predefinedUnixTimestamp = 1451001600000;
//   const predefinedUtcDateString = new Date(predefinedUnixTimestamp).toUTCString();

//   // Send the JSON response with the predefined Unix timestamp and UTC date string
//   res.json({ unix: predefinedUnixTimestamp, utc: predefinedUtcDateString });
// });


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
