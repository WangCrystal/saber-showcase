/**
 * @file 列表查询
 * @author treelite(c.xinle@gmail.com)
 */

var datasource = require('rebas-datasource');

var config = require('../config');

function processData(data) {
    data.forEach(function (item) {
        var str = [item.points + ' point'];
        if (item.points > 1) {
            str.push('s');
        }
        str.push(', ' + item.comments + ' comment');
        if (item.comments > 1) {
            str.push('s');
        }

        item.meta = str.join(''); 
    });
    return data;
}

function query(req, res, next) {
    var url = '/feed/';

    url += req.query.type === 'new' ? 'newest' : 'hotest';

    var fetch = datasource.http(config.remote + url);

    fetch(req, res, function () {
        var data = res.data.data;
        var list = processData(data.data || []);

        res.data = {
            list: list,
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
