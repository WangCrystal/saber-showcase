/**
 * @file app
 * @author treelite(c.xinle@gmail.com)
 */

var rebas = require('rebas');

var server = rebas(function (app) {
    // 错误页处理
    app.after(require('./middleware/error'));
});;

server.start();
