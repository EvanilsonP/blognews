const mongoose = require('mongoose');

const database = () => {
    const link = 'mongodb+srv://EvanilsonP:88813091a@cluster0.rq4v2yp.mongodb.net/new?retryWrites=true&w=majority';
    mongoose.set('strictQuery', false)
    mongoose.connect(link)
    .then((result) => console.log('Connected to the database'))
    .catch((error) => console.log(error));
};

module.exports = { database };