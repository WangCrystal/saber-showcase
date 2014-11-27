/**
 * @file list列表Model基类
 * @author saber(saber@baidu.com)
 */

define(function (require) {

    var inherits = require('saber-lang/inherits');
    var Resolver = require('saber-promise');
    var ajax = require('saber-ajax/ejson');
    var BaseModel = require('saber-firework/Model');
    var Storage = require('saber-storage');

    var KEY_READED = 'readlist';

    var storage = new Storage();

    function process(list) {
        var readed = storage.getItem(KEY_READED) || [];

        list.forEach(function (item) {
            var str = [item.points + ' point'];
            if (item.points > 1) {
                str.push('s');
            }
            str.push(', ' + item.comments + ' comment');
            if (item.comments > 1) {
                str.push('s');
            }

            item.meta = str.join('');

            item.read = readed.indexOf(item.id) >= 0;
        });
    }

    function Model(options) {
        this.data = [];

        BaseModel.call(this, options);
    }

    inherits(Model, BaseModel);

    Model.prototype.query = function (page) {
        var me = this;
        return ajax.get(this.url + '?page=' + page).success(function (res) {
            process(res.list);
            me.data = me.data.concat(res.list);
            me.moreToken = res.more;

            return res;
        });
    };

    Model.prototype.fulfill = function (data) {
        this.data = data.list;
        this.moreToken = data.more;
    };

    Model.prototype.more = function () {
        var token = this.moreToken;
        if (token) {
            this.moreToken = null;
            return this.query(token);
        }
        else {
            return Resolver.rejected();
        }
    };

    return Model;

});
