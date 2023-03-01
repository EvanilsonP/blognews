const express = require('express');
const router = express.Router();
const controller = require('../controllers/newsController');

router.get('/news/create', controller.newsGet);
router.get('/news', controller.news);
router.post('/news', controller.createNews);
router.get('/news/:id', controller.newsDetails);
router.delete('/news/:id', controller.deleteNews);

router.get('/', (req, res) => {
    res.redirect('/news');
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

module.exports = router;