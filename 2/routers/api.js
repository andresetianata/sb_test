const express = require('express');
var router = express.Router();
var Crawl = require('../models/Crawl');

router.get("/test_view_user", Crawl.api_test_view_user)

module.exports = router;