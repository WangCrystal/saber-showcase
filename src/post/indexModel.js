/**
 * @file 详情页model
 * @author saber(saber@baidu.com)
 */

define(function (require) {

    var Resolver = require('saber-promise');
    var ajax = require('saber-ajax/ejson');

    var URL = '/post/';

    var config = {};

    config.fetch = function(query) {
        return ajax.get(URL + query.id);
    };

    return config;

});
