/**
 *
 * routes.js
 *
 * @description
 * @author Fantasy <fantasyshao@icloud.com>
 * @create 2015-01-13
 * @update 2015-01-13
 */

var site = require('./controllers/site');

module.exports = function (app) {

  app.get('/', site.index);

};