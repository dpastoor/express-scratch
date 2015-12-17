// TODO: user app.params to find the lion using the id
// and then attach the lion to the req object and call next. Then in
// '/lion/:id' just send back req.lion

// create a middleware function to catch and handle errors, register it
// as the last middleware on app


// create a route middleware for POST /lions that will increment and
// add an id to the incoming new lion object on req.body

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var lions = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = '' + id;
  }
  next();
};

/* to think of how the callbacks work for app.use
var cbs = [
  morgan,
  express.static,
  bp,
  bp,
  param,
  [...routes],
  err
]

so all routes are kind of like siblings in the run order, so calling next()
will proceed to the next route in the order. So for example, if you have your err
middleware higher in the stack, if one below it PASSES (not throws which will stop everything)
an error and calls next it will still never actually hit the error middleware
*/

app.use(morgan('dev')) // for logging
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
The idea behind app.param is it will run this middleware if the requested route
has a param of id passed in (in this case lions/:id)

notice the 'id' argument - the 4th argument to app.param cb is the value associated
with the query param so we can do processing at this step, so by the time it
is passed to the app.get('lions/:id') it will only be given the lion of that specific
id (eg req.lion), rather than all the lions and then have to do the processing at that step

this will also be applied to any route with the :id query param so don't need to duplicate
logic in your code elsewhere
*/
app.param('id', function(req, res, next, id) {
  // fill this out to find the lion based off the id
  // and attach it to req.lion. Rember to call next()
  var lion = _.find(lions, {id: id});

  if (lion) {
    req.lion = lion;
    next();
  } else {
    // in reality would want to do some sort of better handling
    // like sending back the appropriate error status code,
    // or passing an error into next and let it proceed to the error handling
    // middleware down the line
    res.send();
  }
});

app.get('/lions', function(req, res){
  res.json(lions);
});

app.get('/lions/:id', function(req, res){
  // use req.lion
  res.json(lion || {});
});

app.post('/lions', updateId, function(req, res) {
  var lion = req.body;

  lions.push(lion);

  res.json(lion);
});


app.put('/lions/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]){
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err);
  }
});

app.listen(3000);
console.log('on port 3000');
