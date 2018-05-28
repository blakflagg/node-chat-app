const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
const socketIO = require('socket.io');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const {generateMessage} = require('./utils/message');


const express = require('express');
const port = 3000;
var app = express();
var server = http.createServer((app)); //http.createServer required for socket.io
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {      //event occurs when a client connects to the server
  console.log('new user connected');

  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
  socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));
  
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  })
  socket.on('disconnect',() => {      //event occurs when client disconnects
    console.log('User was disconnected');
  });
});

server.listen(port,() => {
  console.log(`Server is up on ${port}`);
});