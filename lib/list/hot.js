/**
 * @file hot
 * @author treelite(c.xinle@gmail.com)
 */

var datasource = require('rebas-datasource');

var render = require('./render');

var config = require('../config');

exports.get = [
    datasource.http(config.remote + '/feed/hotest'),
    render('list/hot.tpl')
];
