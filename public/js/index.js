var socket = io();                    //intiates request from client to the server
socket.on('connect', function() {           //built-in event occurs when a connection is made to the server
  console.log('connected to server'); 
  socket.emit('createMessage', {
    from: 'Andrew',
    text: 'hello'
  });
});

socket.on('disconnect', function() {       //built-in event occurs when server connection is lost
  console.log("Disconnected from server");
});

socket.on('newMessage', function(message){
  console.log('newMessage', message);
});

socket.on('tick', function(count){
  console.log(count);
});

