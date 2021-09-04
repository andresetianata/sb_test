const db = require('./MySQLConnector');
const axios = require('axios');

module.exports = {
  api_test_view_user
}

function api_test_view_user(req, res) {
  //testing if mysql is successfully connected with query
  db.query('select a.ID, a.UserName, b.UserName as ParentUserName from `USER` a LEFT JOIN `USER` b ON b.ID = a.Parent', function(error, results, field) {
    if (!error) {
      res.json({
        status: "success",
        data: results
      })
    }
    else {
      res.json({
        status: "error",
        errorMessage: error
      })
    }
  });
}