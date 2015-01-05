/**
 * @file list列表Presenter基类
 * @author saber(saber@baidu.com)
 */

define(function (require) {
    
    var extend = require('saber-lang/extend');
    var bind = require('saber-lang/bind');
    var inherits = require('saber-lang/inherits');
    var BasePresenter = require('saber-mm/Presenter');

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

    function Presenter(options) {
        options = options || {};
        extend(events, options.events || {});
        options.events = events;

        BasePresenter.call(this, options);
    }

    inherits(Presenter, BasePresenter);

    return Presenter;

});
