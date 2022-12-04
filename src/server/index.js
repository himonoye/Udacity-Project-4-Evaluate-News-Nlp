//set up .env file config
const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.API_KEY;

var path = require('path')
const express = require('express')
const cors = require('cors');

const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const mockAPIResponse = require('./mockAPI.js')

//set up express
const app = express();

// Cors for cross origin allowance
app.use(cors());
app.use(express.static('client'));

// Dependencies
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Test .env
console.log(`Your API key is ${process.env.API_KEY}`);

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT || 8080, function () {
    console.log('Example app listening on port 8080!')
})

//Test API Response
app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
})

//Get request to load home page
app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'));
})

// Call MeaningCloud API
const retrieveSetimentAnlysis = async (language,urlInput) => {
    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1?key="+API_KEY+"&of=json&lang="+language+"&url="+urlInput)
    .catch((e) => {
        console.log('Meaningcloud error:', e)
    });

    console.log(response)
    return response.json();
}

// Post Route to call MeaningCloud API
app.post('/', async(req, res) => {

    "::: Calling meaningcloud API :::"

    //The current API Url called
    console.log("https://api.meaningcloud.com/sentiment-2.1?key="+API_KEY+"&of=json&lang="+req.body.language+"&url="+req.body.url);

    // Convert MeaningCloud sentiment analysis response
    retrieveSetimentAnlysis(req.body.language,req.body.url)
    .then((data)=>{

        if (data.status.code == 0) {
            //Test Meaningcloud response
            console.log(data);

            //Extract needed data from meaning cloud API response
            const extractedData = {
                code: data.status.code,
                polarity: data.score_tag,
                sampleText: data.sentence_list[0].text, 
                subjectivity: data.subjectivity
            }

            //Send clean data back
            res.send(extractedData);
        } else {
            const error = {
                code: data.status.code,
                msg: data.status.msg,
            }
            res.send(error)
        }
    })
    .catch((e) => {
        console.log('error', e);
    });

})

