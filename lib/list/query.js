/**
 * @file 列表查询
 * @author treelite(c.xinle@gmail.com)
 */

var datasource = require('rebas-datasource');

var config = require('../config');

function query(req, res, next) {
    var url = '/feed/';

    url += req.query.type === 'new' ? 'newest' : 'hotest';

    var fetch = datasource.http(config.remote + url);

    fetch(req, res, function () {
        var data = res.data.data;
        res.data = {
            list: data.data || [],
            more: data.condition.more
        };
        next();
    });
}

function render(req, res, next) {
    res.type('ejson');
    next();
}

module.exports = function (type) {
    return function (req, res, next) {
        req.query.type = type;
        query(req, res, next);
    };
};

module.exports.get = [query, render];
