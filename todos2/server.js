// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
var express = require('express');
var app = express();

var jsonData = {count: 12, message: 'hey'};

app.get('/', (req, res) =>
  // res.sendFile takes an absolute path to a file and
  // sets the mime type based on the file extension
  res.sendFile(__dirname + '/index.html', (err) => {
    if (err) {
      res.status(600).send(err);
    }
  })
);

app.get('/data', (req, res) => res.json(jsonData));

var port = 3000;
app.listen(port, () => console.log('listening on http://localhost:' + port));
