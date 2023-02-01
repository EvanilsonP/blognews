const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandling');

// custom middleware logger
app.use(logger);
// Cross origin resource sharing
const whiteList = ['http://www.yoursite.com', 'http://127.0.0.1:5500'];
const corsOption = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || origin) { // if the domain is not in the white list
            callback(null, true); // null: error, true: domain allowed
        } else {
            callback(new Error('Not allowed by CORS.'));
        }
    },
    optionSucessStatus: 200
}
app.use(cors(corsOption));

// bult-in middleware to handle urlenconded data
// in other words, form data:
// 'content-type': application/x-www-form-urlenconded
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect('new-page.html');
});

app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempted to load hello.html');
    next();
}, (req, res) => {
    res.send('Hello World!!');
});

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if(req.accepts('json')) {
        res.json({ error: '404 not found'});
    } else {
        res.type('txt').send('404 not found.');
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));