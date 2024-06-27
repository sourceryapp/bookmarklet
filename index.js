import express from 'express';
import config from './public/js/config.js'
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import  { jsmin } from 'jsmin';


const app = express();
const port = process.env.PORT || 3000

// Static/Public Directory
app.use(express.static('public'))
app.use(bodyParser.text());


app.get('/api/fake-supabase-edge-function', async (req, res) => {
    let { url } = req.query;
    let response, data

    console.log('Request received:', url)

    try {
        response = await fetch(config.translation_server, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: url
        });
        data = await response.json();
        res.send(data)
    } catch (error) {
        console.error('Error:', error)
        res.send(error)
    }
}) 

app.post('/api/minify', async (req, res) => {
    console.log('Request recieved:', jsmin(req.body))
    res.send(jsmin(req.body))
}) 


app.listen(port, () => {
    console.log(`Sourcery Bookmarklet API listening on port ${port}...`)
})