/**
 * @file list列表Action基类
 * @author saber(saber@baidu.com)
 */

define(function (require) {
    
    var extend = require('saber-lang/extend');
    var bind = require('saber-lang/bind');
    var inherits = require('saber-lang/inherits');
    var BaseAction = require('saber-firework/Action');

    var events = {
        'ready': function (isFirst) {
            // 首屏渲染完成后更新下已读状态
            if (isFirst) {
                this.view.updateItemState(this.model.get());
            }
        },
        // 加载更多事件
        'view:more': function () {
            var view = this.view;
            this.model.more().then(bind(view.add, view));
        },
        // 阅读新闻事件
        'view:viewitem': function (id) {
            this.model.read(id);
        }
    };

    function Action(options) {
        options = options || {};
        extend(events, options.events || {});
        options.events = events;

        BaseAction.call(this, options);
    }

    inherits(Action, BaseAction);

    return Action;

});
