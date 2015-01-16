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

io.on('connection', function (socket) {
  console.log('One user connected');
  socket.on('disconnect', function () {
    console.log('One user disconnect');
  });
});

server.listen(3000, function () {
  console.log('Server started on 3000');
});
