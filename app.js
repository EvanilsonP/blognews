const express = require('express');
const app = express();
const routes = require('./routes/routes');
const db = require('./database/db');
const bodyParser = require("body-parser")
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/news', routes);
db.database();

app.get('/', (req, res) => {
    res.redirect('/news');
});
  
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});
  
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`)});