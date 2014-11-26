/**
 * @file post detail
 * @author treelite(c.xinle@gmail.com)
 */

var config = require('../config');

var datasource = require('rebas-datasource');

function query(req, res, next) {
    var id = req.params.id;

    if (!id) {
        res.data = {detail: {}, comments: []};
        return next();
    }

    var fetch = datasource.http(config.remote + '/post/' + id);

    fetch(req, res, next);
}

function render(req, res, next) {
    res.data = res.data.data;
    res.template = 'post/index.tpl';
    res.type(req.xhr ? 'ejson' : 'html');
    next();
}

exports.get = [query, render];
