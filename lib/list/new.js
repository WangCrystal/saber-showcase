/**
 * @file new
 * @author treelite(c.xinle@gmail.com)
 */

var query = require('./query');

var render = require('./render');

exports.get = [
    query('new'),
    render('list/new.tpl')
];
