//////////////////////////
// Imports
//////////////////////////

const path = require('path');
const express = require('express');
const { getTrendingGifs } = require('../frontend/src/fetch-helpers');

//////////////////////////
// Constants
//////////////////////////

const port = 8080;
const pathToFrontend = path.join(__dirname, '../frontend');
const app = express();


//////////////////////////
// Middleware/Controllers
//////////////////////////

const logRoutes = (req, res, next) => {
    const time = (new Date().toLocaleString());
    console.log(`${req.method}: ${req.originalUrl} - ${time}`)
    next()
}



const serveStatic = express.static(pathToFrontend);

app.use(logRoutes)
app.use(serveStatic);
app.get('/api/gifs', getTrendingGifs)

//////////////////////////
// Listener
//////////////////////////

app.listen(port, () => console.log(`listening at http://localhost:${port}`));