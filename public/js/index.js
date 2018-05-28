var socket = io();                    //intiates request from client to the server
socket.on('connect', function() {           //built-in event occurs when a connection is made to the server
  console.log('connected to server'); 
});

socket.on('disconnect', function() {       //built-in event occurs when server connection is lost
  console.log("Disconnected from server");
});

socket.on('newMessage', function(message){
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('tick', function(count){
  console.log(count);
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  },function() {

  });
});