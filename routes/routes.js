const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.redirect('/news');
});

routes.get('/news', (req, res) => {
    const news = [
        {title: 'The importance of reading', snippet: 'As we know...'}
    ]
    res.render('index', { title: 'News'})
});

routes.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

routes.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

routes.use((req, res) => {
    res.render('404', { title : '404'})
});


module.exports = routes;