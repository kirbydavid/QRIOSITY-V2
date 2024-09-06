const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a route for form submission
app.post('productForm', upload.none(), (req, res) => {
  const formData = req.body;
  const ingredients = JSON.parse(formData.ingredients);

  // Validate ingredients data
  if (!Array.isArray(ingredients)) {
    return res.status(400).json({ success: false, message: 'Invalid ingredients data.' });
  }

  // Validate other form data (add your validation logic here)

  // Save the form data to data.json
  fs.readFile('data.json', (err, data) => {
    if (err && err.code === 'ENOENT') {
      // If the file doesn't exist, create a new one
      return fs.writeFile(
        'data.json',
        JSON.stringify([{ ...formData, ingredients }]),
        (err) => {
          if (err) {
            res.status(500).json({ success: false, message: 'Error creating the file.' });
          } else {
            res.status(200).json({ success: true, message: 'Form data saved.' });
          }
        }
      );
    }
    if (err) {
      res.status(500).json({ success: false, message: 'Error reading the file.' });
      return;
    }
    const jsonData = JSON.parse(data);
    jsonData.push({ ...formData, ingredients });
    fs.writeFile('data.json', JSON.stringify(jsonData), (err) => {
      if (err) {
        res.status(500).json({ success: false, message: 'Error writing to the file.' });
      } else {
        res.status(200).json({ success: true, message: 'Form data saved.' });
      }
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});