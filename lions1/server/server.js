// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything with in client as a static resource
// also, it will server the index.html on the root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
what is going on with the app.use is basically
var appMiddleware = []; (there is a stack) and every time we call app.use
we are passing that function into the array (eg express.static('client'))
so express.static is actually a function that returns another function
var appMiddleware = [function(req, res, next){

}, , , , ]
and it runs them in order of registration every time we have a request come in

This is GLOBAL middleware and it will run every request through this regardless
of the endpoint it is trying to hit, before it gets appropriately routed
*/

// this is currently our 'database' of lions
let lions = [];
let id = 0; // we can use this as the 'id' of the lion

// TODO: make the REST routes to perform CRUD on lions
app.get('/lions', (req, res) => res.json(lions));

app.get('lions/:id', (req, res) => {
  // all req.params.<x> will be strings so if need to store as number need to parse
  let lion = _.find(lions, {id: req.params.id});
  res.json(lion || {});
});

app.post('/lions', (req, res) => {
     // by the time we access req.body it is already a javascript object
    let lion = req.body;
    id++; // increment global id
    lion.id = '' + id; //coerce to string

    lions.push(lion);

    res.json(lion);
});

app.put('/lions/:id', (req, res) => {
  let update = req.body;
  if (update.id) {
      delete update.id;
  }

  let lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]) {
    res.send(); // if nothing just stop don't send anything more
  } else {
    let updatedLion = _.assign(lions[lion], update); // this extends existing object
    // with the new information
    res.json(updatedLion);
  }
});

app.delete('/lions/:id', (req, res) => {
  let lion = _.findIndex(lions, {id: req.params.id});
  
  if (!lions[lion]) {
    res.send();
  } else {
    let deletedLion = lions[lion];
    lions.splice(lion, 1);
    res.json(deletedLion);
  }
});

app.listen(3000);
console.log('on port 3000');
