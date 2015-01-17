/**
 *
 * index.js
 *
 * @description
 * @author Fantasy <fantasyshao@icloud.com>
 * @create 2015-01-13
 * @update 2015-01-13
 */

;(function () {
  var socket = io();
  var _ = {
    one: function (selector) {
      return document.getElementById(selector);
    },
    all: function (selector) {
      return document.querySelectorAll(selector);
    }
  };

  var renderMsg = function (name, msg) {
    var $li = document.createElement('li');
    if (name == 'me') {
      $li.innerHTML = '<p style="color: blue;">' + name + ': ' + msg + '</p>';
    } else {
      $li.innerHTML = '<p style="color: black;">' + name + ': ' + msg + '</p>';
    }
    list.appendChild($li);
  };

  // variables
  var goBtn = _.one('go'),
      btn = _.one('send');

  var loginPage = _.one('login'),
      chatroomPage = _.one('chatroom'),
      roominfo = _.one('roominfo');

  var message = _.one('message');
  var list = _.one('messageList');

  // user join chat
  goBtn.onclick = function () {
    var username = _.one('username').value;

    if (username) {
      socket.emit('user join', username);
    }

    return false;
  };

  // send msg
  btn.onclick = function () {
    socket.emit('chat msg', message.value);
    renderMsg('me', message.value);
    message.value = '';
    return false;
  };

  socket.on('login', function () {
    alert('Welcome to the chat');
    loginPage.classList.add('hide');
    chatroomPage.classList.remove('hide');
  });

  socket.on('user join', function (data) {
    roominfo.innerHTML = data.name + ' joined. ' + data.number + ' pepole in the room.';
  });

  socket.on('chat msg', function (data) {
    renderMsg(data.username, data.message);
  });

})();

