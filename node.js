const express = require('express');
const { google } = require('googleapis');
const path = require('path');

const app = express();
const sheets = google.sheets('v4');

// Konfigurasi Google Sheets API
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json', // Ganti dengan path ke file kredensial Google Cloud Anda
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

// Endpoint untuk mengambil data dari Google Sheets
app.get('/api/sheets-data', async (req, res) => {
  try {
    const client = await auth.getClient();
    const result = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: '1EevPSckJw22gIwcENrg9stlrLzC-XNi4Br_lsOpk2I8', // Ganti dengan ID spreadsheet Anda
      range: 'Sheet1!A2:C',
    });
    res.json(result.data.values);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Serve static files (index.html, script.js, styles.css)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
