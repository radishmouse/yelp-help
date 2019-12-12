'use strict';

const yelp = require('yelp-fusion'); // calls in the library from that nice gitHub man




// express code
const express = require('express'); // pull in express library
const app = express(); 
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!')); 
// put this in your other file:
// fetch(`http://localhost:THIS_IS_WHERE_YOUR_PORT_NUMBER_GOES_(SEE_LINE_11)/THE_PHONE_NUMBER_GOES_HERE/YELP_API_KEY_GOES_HERE`)

app.get('/:location/:apiKey', (req, res) => { // everything after :port is known as "phonenumber"

    const client = yelp.client(req.params.apiKey); 

    client.eventSearch({ // that's from way above, the yelp-fusion library (happens inside of a callback: when you see ":port/stuff", run this)
        location:`${req.params.location}`
    }).then(response => {
        // protect me from CORS! pulled from radishmouse's my-little-cors
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        res.send(response.jsonBody.events);
    }).catch(e => {
        console.log(e);
    });
    // res.send(`${req.params.phonenumber}`);

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));




