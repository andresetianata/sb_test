const db = require('./MySQLConnector');
const axios = require('axios');
const connection = require('./MySQLConnector');

module.exports = {
  api_test_view_user
}

function api_test_view_user(req, res) {
  //testing if mysql is successfully connected with query
  db.getConnection(function(errorGet, connection) {
    if (errorGet) return;
    //console.log("Connection got")
    connection.query('select a.ID, a.UserName, b.UserName as ParentUserName from `USER` a LEFT JOIN `USER` b ON b.ID = a.Parent', function(error, results, field) {
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
      connection.release();
    });
  })
}

function api_do_search_movie_title(req,res) {

}

function api_do_get_movie_detail(req, res) {

}

function api_do_logging_access(req, res) {
  
}