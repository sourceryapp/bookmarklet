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


/**
 * This function mimics the functionality of the production
 * function that (at the time of writing) will be deployed to Supabase Edge.
 * 
 * This utilizes the Zotero translation server to translate the URL
 * into structured data, which is passed to the Sourcery request form.
 */
app.get('/api/fake-supabase-edge-function', async (req, res) => {
    let { url } = req.query;
    let response, data
    let redirect_url = new URL(config.sourcery_request_url);

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

        // Extract the title from the data
        redirect_url.searchParams.append("title", data[0].title);

        // @todo format the data to be more readable (rather than JSON stringified)
        redirect_url.searchParams.append("message", JSON.stringify(data[0], null, 4));

        // redirect to redirect_url
        res.redirect(redirect_url.toString());
    } catch (error) {
        console.error('Error:', error)
        res.send(error)
    }
}) 

/**
 * Just a simple endpoint to minify JS code.
 * Should probably switch to something better than jsmin.
 * (maybe terser?)
 */
app.post('/api/minify', (req, res) => {
    let minifiedCode
    try {
        minifiedCode = jsmin(req.body)
        console.log('Minified code:', minifiedCode)
        res.send(minifiedCode)
    } catch (error) {
        res.send(error)
    }
}) 


app.listen(port, () => {
    console.log(`Sourcery Bookmarklet API listening on port ${port}...`)
})