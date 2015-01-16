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

  var btn = _.one('send');
  var message = _.one('message');
  var list = _.one('messageList');

  // send msg
  btn.onclick = function () {
    socket.emit('chat msg', message.value);
    message.value = '';
    return false;
  };

  socket.on('chat msg', function (msg) {
    var $li = document.createElement('li');
    $li.innerHTML = 'me: ' + msg;
    list.appendChild($li);
  });

})();

