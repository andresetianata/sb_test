const express = require('express');
var router = express.Router();
var Crawl = require('../models/Crawl');
var AccessLog = require('../models/AccessLog');

router.get('/search', Crawl.api_do_search_movie_title);
router.get('/detail', Crawl.api_do_get_movie_detail);
router.get('/view_access_log', AccessLog.api_do_logging_access)

module.exports = router;