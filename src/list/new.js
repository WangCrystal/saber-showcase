/**
 * @file new list
 * @author saber(saber@baidu.com)
 */

define(function (require) {

    var config = {};

    config.constructor = require('./Presenter');

    config.model = require('./newModel');

    config.view = require('./newView');

    return config;

});
