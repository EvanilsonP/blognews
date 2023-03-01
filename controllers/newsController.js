const News = require('../models/newsModel');

const blog_index = (req, res) => {
  News.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { news: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_details = (req, res) => {
  const id = req.params.id;
  News.findById(id)
    .then(result => {
      res.render('details', { news: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}

const blog_create_post = (req, res) => {
  const news = new News(req.body);
  news.save()
    .then(result => {
      res.redirect('/news');
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_delete = (req, res) => {
  const id = req.params.id;
  News.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/news' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete
}