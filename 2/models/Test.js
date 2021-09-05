/**
 * This is a test file, testing connection with mysql
 */
 const db = require('./MySQLConnector');

 module.exports = {
   api_test_view_user
 };

 
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
