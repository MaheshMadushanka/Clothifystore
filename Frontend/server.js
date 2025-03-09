const express = require('express');
const cors = require('cors');
const multer = require('multer'); // For handling file uploads



const app = express();
const PORT = 8081;

// Middleware
app.use(cors());
app.use(express.json());

// Set up file upload handling
const upload = multer({ dest: 'uploads/' }); // Specify upload directory

// Endpoint to handle product upload
app.post('/product/add-product', upload.single('image'), (req, res) => {
  const { name, price, qty, description } = req.body;
  const image = req.file;

  // Example: Save the data to a database here

  res.status(200).json({ message: 'Product added successfully', product: { name, price, qty, description, image } });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
