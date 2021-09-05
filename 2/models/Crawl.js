const db = require('../db/MySQLConnector');
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
      //ketika mencoba melakukan testing untuk mendapatkan detail dengan id yang mengandung spasi, ternyata format value di key 'Error' nya salah. jadi JSON tidak bisa di parse
      //ex error yang berupa string : {"Response":"False","Error":"Conversion from string "Spider Man" to type 'Double' is not valid."}, saat querystring 'i' tidak berupa ID Imdb
      if (typeof result.data === 'string') {
        try {
          result.data = JSON.parse(result.data);
        }
        catch(errorParsing) {
          reject({
            responseCode: 500,
            status: "error",
            errorMessage: "failed to parse response to JSON format"
          })
        }
      }
      if (result.data.Response == 'True') {
        resolve(result.data);
      }
      else {
        reject({
          responseCode: 400,
          status: "error",
          errorMessage: result.data.Error
        }); //berisi error message dari OMDB
      }
    })
    .catch(function(error) {
      console.log("Error API", error)
      reject({
        responseCode: 500,
        status: "error",
        errorMessage: "Error while requesting API"
      });
    })
  });
}
function insert_logging(endpoint, parameter, responseCode) {
  return new Promise((resolve, reject) => {
    db.getConnection((errorConnection, connection) => {
      if (errorConnection) reject({responseCode: 500, status: "error", errorMessage: "failed to connect to database"});
      var CURRENT_TIMESTAMP = {toSqlString: function() { return 'CURRENT_TIMESTAMP()'; }}
      var sql = connection.format("INSERT INTO `ACCESS_LOG` (DateTimeAccess, EndPoint, Parameter, HttpResponseCode) VALUES (?,?,?,?)", [CURRENT_TIMESTAMP, endpoint, parameter, responseCode])
      connection.query(sql, (errorQuery, results, fields) => {
        if (errorQuery) reject({responseCode: 500, status: "error", errorMessage: "Query error"});
        
        resolve(results);

        connection.release();
      })
    })
  })
}
async function api_do_search_movie_title(req,res) {
  try {
    if (req.query.keyword) {
      if (req.query.keyword.length == 0) throw { responseCode:400, status: "error", errorMessage: "invalid search parameter" }
      var page = 1; //default page
      if (Number.isInteger(parseInt(req.query.page))) page = parseInt(req.query.page);
      
      var splittedUrl = get_path_and_query_string(req.originalUrl);
      let search = await call_omdbapi({
        "s": req.query.keyword,
        "page": req.query.page
      });
      let logging = await insert_logging(splittedUrl.path, splittedUrl.queryString, 200); //Http 200 = OK

      res.status(200).json({
        status: "success",
        page: page,
        data: search
      })
    }
    else {
      throw {
        responseCode: 400,
        status: "error",
        errorMessage: "invalid request parameter"
      }
    }
  }
  catch(error) {
    let logging = await insert_logging(splittedUrl.path, splittedUrl.queryString, error.responseCode); //Http 400 = Bad Request
    res.status(error.responseCode).json({
      status: error.status,
      errorMessage: error.errorMessage
    })
  }
  
}

async function api_do_get_movie_detail(req, res) {
  try {
    if (req.query.id || req.query.title) {
      //jika API OMDB diberi IMDB ID yang invalid(diluar alphanumeric), maka response JSON yang di dapat akan error/tidak bisa diparsing
      //maka, difilter saja supaya req.query.id yang diterima hanyalah yang berupa alphanumeric
      if (req.query.id && !req.query.id.match(/^[a-zA-Z0-9]+$/g)) throw { responseCode:400, status: "error", errorMessage: "invalid ID parameter"}
      var paramsObject = {};
      var splittedUrl = get_path_and_query_string(req.originalUrl);
      if (req.query.id) paramsObject.i = req.query.id;
      if (req.query.title) paramsObject.t = req.query.title;

      let detail = await call_omdbapi(paramsObject);
      let logging = await insert_logging(splittedUrl.path, splittedUrl.queryString, 200); //Http 200 = OK

      res.json({
        status: "success",
        data: detail
      })
    }
    else {
      throw {
        responseCode: 400,
        status: "error",
        errorMessage: "invalid request parameter"
      }
    }
  }
  catch(error) {
    let logging = await insert_logging(splittedUrl.path, splittedUrl.queryString, error.responseCode); //Http 400 = Bad Request
    res.status(error.responseCode).json({
      status: error.status,
      errorMessage: error.errorMessage
    })
  }
}