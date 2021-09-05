const db = require('./MySQLConnector');
const axios = require('axios');

require('dotenv').config();

module.exports = {
  api_do_search_movie_title,
  api_do_get_movie_detail
}

function get_path_and_query_string(originalUrl) {
  var index = originalUrl.indexOf("?");
  var path = originalUrl.substr(0, index);
  var queryString = originalUrl.substr(index, originalUrl.length);

  return {
    path,
    queryString
  }
}
function call_omdbapi(paramsObject) {
  return new Promise((resolve, reject) => {
    var url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}`;
    axios.get(url, {
      params: paramsObject
    })
    .then(function(result) {
      if (result.data.Response == 'True') {
        resolve(result.data);
      }
      else {
        reject(result.data); //berisi error message dari OMDB
      }
    })
    .catch(function(error) {
      reject(error);
    })
  });
}
function insert_logging(endpoint, parameter) {
  return new Promise((resolve, reject) => {
    db.getConnection((errorConnection, connection) => {
      if (errorConnection) reject(errorConnection);
      var CURRENT_TIMESTAMP = {toSqlString: function() { return 'CURRENT_TIMESTAMP()'; }}
      var sql = connection.format("INSERT INTO `ACCESS_LOG` (DateTimeAccess, EndPoint, Parameter) VALUES (?,?,?)", [CURRENT_TIMESTAMP, endpoint, parameter])
      connection.query(sql, (errorQuery, results, fields) => {
        if (errorQuery) reject(errorQuery);
        
        resolve(results);

        connection.release();
      })
    })
  })
}
async function api_do_search_movie_title(req,res) {
  try {
    var splittedUrl = get_path_and_query_string(req.originalUrl);

    let search = await call_omdbapi({
      "s": req.query.s,
      "page": req.query.page
    });
    let logging = await insert_logging(splittedUrl.path, splittedUrl.queryString);

    res.json({
      status: "success",
      data: search
    })
  }
  catch(error) {
    console.log(error);
    res.json({
      status: "error",
      errorMessage: error
    })
  }
  
}

async function api_do_get_movie_detail(req, res) {
  try {
    var paramsObject = {};
    var splittedUrl = get_path_and_query_string(req.originalUrl);
    if (req.query.i) paramsObject.i = req.query.i;
    if (req.query.t) paramsObject.t = req.query.t;

    let detail = await call_omdbapi(paramsObject);
    let logging = await insert_logging(splittedUrl.path, splittedUrl.queryString);

    res.json({
      status: "success",
      data: detail
    })
  }
  catch(error) {
    console.log(error);
    res.json({
      status: "error",
      errorMessage: error
    })
  }
}