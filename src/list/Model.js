/**
 * @file list列表Model基类
 * @author saber(saber@baidu.com)
 */

define(function (require) {

    var bind = require('saber-lang/bind');
    var inherits = require('saber-lang/inherits');
    var Resolver = require('saber-promise');
    var ajax = require('saber-ajax/ejson');
    var BaseModel = require('saber-firework/Model');
    var Storage = require('saber-storage');

    var KEY_READED = 'readlist';

    var storage = new Storage();

    function Model(options) {
        this.data = [];
        // 获取已阅读的新闻id
        this.readList = storage.getItem(KEY_READED) || [];

        BaseModel.call(this, options);
    }

    inherits(Model, BaseModel);

    /**
     * 数据填充
     *
     * @public
     * @param {Object} data
     * @return {Object}
     */
    Model.prototype.fulfill = function (data) {
        var readList = this.readList;
        var list = data.list;
        list.forEach(function (item) {
            if (readList.indexOf(item.id) >= 0) {
                item.read = true;
            }
        });
        this.data = this.data.concat(list);
        this.moreToken = data.more;
        return data;
    };

    /**
     * 获取下一页数据
     *
     * @public
     * @return {Promise}
     */
    Model.prototype.more = function () {
        var token = this.moreToken;
        if (token) {
            this.moreToken = null;
            return ajax.get(this.url + '?page=' + token).success(bind(this.fulfill, this));
        }
        else {
            return Resolver.rejected();
        }
    };

    /**
     * 标记新闻为已读
     *
     * @public
     * @param {string} id
     */
    Model.prototype.read = function (id) {
        if (this.readList.indexOf(id) >= 0) {
            return;
        }

        for (var i = 0, item; item = this.data[i]; i++) {
            if (item.id === id) {
                item.read = true;
                break;
            }
        }

        this.readList.push(id);
        storage.setItem(KEY_READED, this.readList);
    };

    /**
     * 获取新闻列表
     *
     * @public
     * @return {Array}
     */
    Model.prototype.get = function () {
        return [].concat(this.data);
    };

    return Model;

});
