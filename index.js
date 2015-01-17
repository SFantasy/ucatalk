/**
 *
 * index.js
 *
 * @description
 * @author Fantasy <fantasyshao@icloud.com>
 * @create 2015-01-13
 * @update 2015-01-13
 */

var path = require('path');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var routes = require('./routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
routes(app);

var userNames = {};
var userNumber = 0;

io.on('connection', function (socket) {
  var added = false;

  console.log('One user connected');

  socket.on('disconnect', function () {
    console.log('One user disconnect');
    userNumber--;
  });

  socket.on('chat msg', function (msg) {

    socket.broadcast.emit('chat msg', {
      username: socket.name,
      message: msg
    });
  });

  socket.on('user join', function (name) {
    socket.name = name;
    userNames[name] = name;
    userNumber++;
    added = true;

    socket.emit('login', {
      userNumber: userNumber
    });

    socket.broadcast.emit('user join', {
      name: socket.name,
      number: userNumber
    });

    console.log('Total user: ' + userNumber);
  });
});

server.listen(3000, function () {
  console.log('Server started on 3000');
});
