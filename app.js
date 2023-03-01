const express = require('express');
const app = express();
const routes = require('./routes/routes');
const PORT = 3000;

app.use(routes);
app.set('view engine', 'ejs');


app.listen(PORT, () => { console.log(`Server running on port ${PORT}`)});