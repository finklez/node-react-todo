# Node React Todo

### Live demo
[See @ Heroku](https://node-react-t0do.herokuapp.com/)

### Known issues
* new todos are added in random order, i believe the prob is due to the uniqid keys and using redis sets

### Setup

install nodemon globally

```
npm i nodemon -g
```

run dev server locally

```
yarn dev
```

### Run locally

browse local Express 'hello' GET api route example

```
http://localhost:5000/api/hello
```

browse local react server

```
http://localhost:3000/
```


### Sources

initial setup - [https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)

node with Redis - [https://hackernoon.com/using-redis-with-node-js-8d87a48c5dd7](https://hackernoon.com/using-redis-with-node-js-8d87a48c5dd7)

NodeRedis api - [https://github.com/NodeRedis/node_redis](https://github.com/NodeRedis/node_redis)