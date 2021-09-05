const db = require('./MySQLConnector');
const axios = require('axios');
require('dotenv').config();

module.exports = {
  api_do_search_movie_title,
  api_do_get_movie_detail
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

async function api_do_search_movie_title(req,res) {
  try {
    let search = await call_omdbapi({
      "s": req.query.s,
      "page": req.query.page
    });

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
    if (req.query.i) paramsObject.i = req.query.i;
    if (req.query.t) paramsObject.t = req.query.t;

    let detail = await call_omdbapi(paramsObject);

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

function api_do_logging_access(req, res) {
  
}