// server.js

const express = require('express');
const app = express();
const page = require('page_classes');

const hostname = '127.0.0.1';
const port = 3000;
// uncomment below if working on pc
const ROOTPATH = 'D:/gig-guide/website/';
// uncomment below if working on laptop
// const ROOTPATH = 'C:/Users/jarra/Documents/gig-guide/website';

app.use(express.static(ROOTPATH));

app.get('/', (request, response) => {
    JSDOM.fromFile(`${ROOTPATH}main.html`).then(dom => {
        console.log(dom.serialize());
        let document = dom.window.document;
        //document.getElementById();
        response.sendFile(`${ROOTPATH}main.html`);
    });


});

app.get('/gigs/', (request, response) => {
    response.sendFile(`${ROOTPATH}gigs/main.html`);
});

app.get('/venues/', (request, response) => {
    response.sendFile(`${ROOTPATH}venues/main.html`);
});

app.get('/artists/', (request, response) => {
    response.sendFile(`${ROOTPATH}artists/main.html`);
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});