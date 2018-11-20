const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

var redis = require('redis');
var client = redis.createClient(); // this creates a new client

var Promise = require("bluebird");
Promise.promisifyAll(redis);

// var uuid = require('uuid');
const uuidv1 = require('uuid/v1');

client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//============ API calls
app.get('/api/hello', (req, res) => {
  client.get('my test key', function (error, result) {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log('GET result ->' + result);
  });
  res.send({ express: 'Node React Todo' });
});

app.get('/api/reset', (req, res) => {
  client.smembersAsync('todo').then(function(keys) {

    // start a separate multi command queue
    multi = client.multi();

    keys.forEach(function(key) {
      multi.del(key)
    });

    // drains multi queue and runs atomically
    multi.exec(function (err, replies) {
      console.log(replies);
      client.del('todo');
      res.send({ response: 'reset done' });
    });
  });
});

app.get('/api/todo-list', (req, res) => {
  // console.log('start');
  client.smembersAsync('todo').then(function(keys) {
    // console.log(keys);

    // start a separate multi command queue
    multi = client.multi();

    keys.forEach(function(key) {
      multi.hgetall(key)
    });

    // drains multi queue and runs atomically
    multi.exec(function (err, replies) {
      // console.log(replies); // 101, 2
      replies.forEach(function(todo, idx) {
        todo.id = keys[idx]
      });
      console.log(replies);
      res.send({ todos: replies });
    });
  });
  // console.log('end');

});

app.post('/api/todo', (req, res) => {
  console.log(req.body);
  const uuid = uuidv1();
  client.hmset(uuid, {text: req.body.post, completed: 0}, redis.print);

  client.sadd('todo', uuid);
  res.send({uuid: uuid});
});

app.patch('/api/todo', (req, res) => {
  console.log(req.body);
  const uuid = req.body.post;
  client.hset(uuid, 'completed', 1, redis.print);
  res.send({status: 1});
});

app.delete('/api/todo', (req, res) => {
  console.log(req.body);
  const uuid = req.body.post;
  client.del(uuid, redis.print);
  client.srem('todo', uuid, redis.print);
  res.send({status: 1});
});

// app.post('/api/world', (req, res) => {
//   console.log(req.body);
//
//   client.set('my test key', 'my test value', redis.print);
//   res.send(
//       `I received your POST request. This is what you sent me: ${req.body.post}`,
//   );
// });

//============ API calls

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));