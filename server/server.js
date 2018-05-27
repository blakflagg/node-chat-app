const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
const socketIO = require('socket.io');


const express = require('express');
const port = 3000;
var app = express();
var server = http.createServer((app)); //http.createServer required for socket.io
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket) => {      //event occurs when a client connects to the server
  console.log('new user connected');

  socket.on('disconnect',() => {      //event occurs when client disconnects
    console.log('User was disconnected');
  });
});

server.listen(port,() => {
  console.log(`Server is up on ${port}`);
});