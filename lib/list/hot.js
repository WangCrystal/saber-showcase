/**
 * @file hot
 * @author treelite(c.xinle@gmail.com)
 */

var query = require('./query');

var render = require('./render');

exports.get = [
    query('hot'),
    render('list/hot.tpl')
];
