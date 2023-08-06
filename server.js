import express, { application } from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util.js';



// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8082;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

app.get('/filteredimage', async (req, res) => {
  if (!req.query.image_url) {
    res.status(400).send('image_url is required');
  } else {
    let image_url = req.query.image_url.toString();
    if (!image_url)
      res.status(400).send('image_url is required');
    else {
      let filteredPath = await filterImageFromURL(image_url);
      res.status(200).sendFile(filteredPath, () => {
        deleteLocalFiles([filteredPath]);
      })
    }
  }
})

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.send("Welcome to fillter image")
});


// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
