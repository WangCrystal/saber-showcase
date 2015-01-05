/**
 * @file list列表View基类
 * @author saber(saber@baidu.com)
 */

define(function (require) {

    var extend = require('saber-lang/extend');
    var inherits = require('saber-lang/inherits');
    var dom = require('saber-dom');
    var BaseView = require('saber-mm/View');

    /**
     * 更新条目的阅读状态
     *
     * @inner
     * @param {HTMLElement} ele
     * @param {Object} info
     */
    function updateItemState(ele, info) {
        if (info.read) {
            ele.setAttribute('data-state', 'read');
        }
        else {
            ele.removeAttribute('data-state');
        }
    }

    var domEvents = {
        // 点击更多
        'click: .news-list-more': function (ele) {
            if (!dom.hasClass(ele, 'loading')) {
                dom.addClass(ele, 'loading');
                this.emit('more');
            }
        },
        // 点击新闻条目
        'click: a[class=news-item]': function (ele) {
            var id = ele.getAttribute('data-id');
            this.emit('viewitem', id);
            updateItemState(ele, {read: true});
        }
    };

    function View(options) {
        options = options || {};
        extend(domEvents, options.domEvents || {});
        options.domEvents = domEvents;

        BaseView.call(this, options);
    }

    inherits(View, BaseView);

    /**
     * 添加新闻条目
     *
     * @public
     * @param {Object} data
     */
    View.prototype.add = function (data) {
        var moreBtn = this.query('.news-list-more');
        dom.removeClass(moreBtn, 'loading');
        dom[data.more ? 'show' : 'hide'](moreBtn);

        var container = this.query('.news-list');
        container.innerHTML += this.template.render('newsList', data);
    };

    /**
     * 更新新闻条目
     *
     * @public
     * @param {Array} list
     */
    View.prototype.updateItemState = function (list) {
        var eles = this.queryAll('a[class=news-item]');
        var eleMapper = {};

        eles.forEach(function (item) {
            var id = item.getAttribute('data-id');
            eleMapper[id] = item;
        });

        list.forEach(function (item) {
            var ele = eleMapper[item.id];
            if (ele) {
                updateItemState(ele, item);
            }
        });
    };

    return View;

});
