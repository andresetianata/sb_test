const db = require('../db/MySQLConnector');

module.exports = {
  api_do_logging_access
}

function api_do_logging_access(req, res) {
  db.getConnection((errorConnection, connection) => {
    if (!errorConnection) {
      var sql = connection.format("SELECT * FROM `ACCESS_LOG`");
      connection.query(sql, (errorQuery, results, fields) => {
        if (!errorQuery) {
          res.json({
            status: "success",
            data: results
          })
        }
        else {
          res.json({
            status: "error",
            errorMessage: errorQuery
          })
        }
        connection.release();
      })
    }
    else {
      res.json({
        status: "error",
        errorMessage: errorConnection
      })
    }
  })
}