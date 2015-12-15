var todos = [];

app.get('/todos', function(req, res) {
  // send back a json response
  res.json(todos);
  // could also do res.send(todos) which will also send as json
  // but res.json also converts undefined and null to json (even though not technically valid)
});

app.post('/todos', function(req, res) {
  // can get the todo object attached to the body of the request
  var todo = req.body.todo;

  todos.push(todos);
  // res.send converts to json as well
  // but req.json will convert things like null and undefined to json too although its not valid
  res.send(todo);
});

// get the parameters from the route
app.get('/todos/:id', function(req, res) {
  // so anything after /todos/ will be considered to be an id and will be put
  // in the 'id' param
  var todo = _.find(todos, {id: req.params.id});

  res.json(todo);
});
