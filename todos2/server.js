// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
var express = require('express');
var app = express();

var jsonData = {count: 12, message: 'hey'};

app.get('/', (req, res) =>
  // res.sendFile takes an absolute path to a file and
  // sets the mime type based on the file extension
  // to resolve urls can also use the path module to manage proper '/' resolution
  res.sendFile(__dirname + '/index.html', (err) => {
    if (err) {
      res.status(500).send(err);
    }
  })
  //don't need the error handling could also do
  // res.sendFile(__dirname = '/index.html')
);

app.get('/data', (req, res) => res.json(jsonData));

var port = 3000;
app.listen(port, () => console.log('listening on http://localhost:' + port));
