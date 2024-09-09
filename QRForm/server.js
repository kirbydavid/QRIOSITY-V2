const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const cors = require('cors'); 
app.use(cors());

app.post('/save-data', (req, res) => {
  const data = req.body;
  const jsonData = JSON.stringify(data, null, 2);

  fs.writeFile('data.json', jsonData, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).send({ message: 'Error writing to file' });
    } else {
      res.send({ message: 'Data saved successfully' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});