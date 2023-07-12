const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Create multer instance for handling file uploads
const upload = multer({ storage: storage });

// Serve static files from the uploads directory
app.use(express.static('uploads'));

// Endpoint for uploading images
app.post('/upload', upload.array('images', 10), (req, res) => {
  // Handle the uploaded images and store them in the database
  // You can save the file paths or URLs in a database for retrieval

  res.status(200).json({ message: 'Images uploaded successfully' });
});

// Endpoint for getting the gallery images
app.get('/gallery', (req, res) => {
  // Retrieve the image paths or URLs from the database
  // Generate the HTML code dynamically to display the images

  // Example data
  const imagePaths = [
    'uploads/image1.jpg',
    'uploads/image2.jpg',
    'uploads/image3.jpg',
  ];

  // Generate the HTML code for displaying the images
  const galleryHTML = imagePaths
    .map((imagePath) => `<div class="gallery-item"><img src="${imagePath}" alt="Gallery Image"></div>`)
    .join('');

  // Return the HTML code
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Painting Gallery - Online Art Store</title>
      <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/css/bootstrap.min.css">
      <!-- Tailwind CSS -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css">
      <style>
        /* Additional Custom Styles */
        body {
          font-family: 'Poppins', sans-serif;
        }
    
        /* Gallery Styles */
        .gallery {
          padding: 4rem;
        }
    
        .gallery-item {
          display: inline-block;
          margin: 1rem;
          max-width: 300px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease;
        }
    
        .gallery-item:hover {
          transform: scale(1.05);
        }
    
        .gallery-item img {
          max-width: 100%;
          height: auto;
        }
      </style>
      <!-- Google Fonts -->
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body>
      <!-- Gallery Section -->
      <section class="gallery py-16">
        <div class="container mx-auto">
          <h2 class="text-4xl font-bold text-center mb-8">Gallery</h2>
          <div class="flex flex-wrap justify-center">
            ${galleryHTML}
          </div>
        </div>
      </section>
    
      <!-- Bootstrap JS -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `;

  res.send(html);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
