const express = require('express');
const app = express();
const apiRouter = require('./routers/api');
const port = 8001;
const http = require('http');

app.use('/apis', apiRouter);
app.set("port", port);


var server = http.createServer(app);
server.listen(port);
server.on("listening", onListening);
server.on("error", onError)


function onListening() {
  console.log("Listening on " + server.address().port)
}
function onError(error) {
  console.log("Error ", error)
}