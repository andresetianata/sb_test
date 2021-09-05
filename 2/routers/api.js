const express = require('express');
var router = express.Router();
var Crawl = require('../models/Crawl');
var Test = require('../models/Test')

//require('../models/MySQLConnector');

router.get("/test_view_user", Test.api_test_view_user);

router.get('/search', Crawl.api_do_search_movie_title);
router.get('/detail', Crawl.api_do_get_movie_detail);

module.exports = router;