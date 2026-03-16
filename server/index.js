//////////////////////////
// Imports
//////////////////////////

const path = require('path');
const express = require('express');

const dotenv = require('dotenv')
dotenv.config()
console.log(process.env.API_KEY)
//////////////////////////
// Constants
//////////////////////////

const app = express();
const port = 8080;
let pathToFrontend = path.join(__dirname, '../frontend');
if (process.env.NODE_ENV === 'production'){
    pathToFrontend = path.join(__dirname, '../frontend/dist')
}

//////////////////////////
// Middleware/Controllers
//////////////////////////

const logRoutes = (req, res, next) => {
    const time = (new Date()).toDateString()
    console.log(`${req.method}: ${req.originalUrl} - ${time}`)
    next()
}

const serveStatic = express.static(pathToFrontend);
app.use(logRoutes)
app.use(serveStatic);


/////////////////////////
/// Controllers
/////////////////////////

const serverGetTrendingGifs = async (req, res, next) => {
    try {
        const url = `https://api.giphy.com/v1/gifs/trending?limit=3&rating=g&api_key=${process.env.API_KEY}`
        console.log("GIPHY API KEY:", process.env.API_KEY)
        const response = await fetch (url)

        if (!response.ok) {
            throw Error (`Fetch failed. ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        res.send(data.data)
    }catch (error) {
        res.status(503).send(error)
    }
}

const serverSearchGifs = async (req, res) => {
    try {
        const searchTerm = req.query.q; 
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchTerm}&limit=3`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Fetch failed. ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.send(data.data);
    } catch (error) {
        res.status(503).send({ error: error.message });
    }
}


const server404 = (req, res, next) => {
    res.status(404).send({error: `Not found: ${req.originalUrl}`})
}

app.get('/api/gifs', serverGetTrendingGifs)
app.get('/api/search', serverSearchGifs);
app.use(server404)

//////////////////////////
// Listener
////////////////////////// 

app.listen(port, () => console.log(`listening at http://localhost:${port}`)); 