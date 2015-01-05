/**
 * @file host list
 * @author saber(saber@baidu.com)
 */

define(function (require) {

    var config = {};

    config.constructor = require('./Presenter');

    config.model = require('./hotModel');

    config.view = require('./hotView');

    return config;

});
