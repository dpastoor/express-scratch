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


var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions


app.listen(3000);
console.log('on port 3000');
