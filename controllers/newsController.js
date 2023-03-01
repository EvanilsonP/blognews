const News = require('../models/newsModel');

const news = (req, res) => {
    News.find().sort({ createdAt: -1 })
    .then(result => {
        res.render('index', { news: result, title: 'All news'})
    })
    .catch(err => {
        console.log(err);
      });
};

const newsDetails = (req, res) => {
    News.findById(req.params.id)
    .then(result => {
        res.render('details', { news: result, title: 'News Details'})
    })
    .catch(err => console.log(err));
}

const createNews = (req, res) => {
    const news = new News(req.body);
    news.save()
    .then(result => {
        res.redirect('/news');
      })
      .catch(err => {
        console.log(err);
      });
};

const newsGet = (req, res) => {
    res.render('create', { title: 'Create a new blog' });
};
  
const deleteNews = (req, res) => {
    News.findByIdAndDelete(req.params.id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = { news, newsDetails, createNews, newsGet, deleteNews };