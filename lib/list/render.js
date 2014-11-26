/**
 * @file 公共render
 * @author treelite(c.xinle@gmail.com)
 */

module.exports = function (tpl) {
    return function (req, res, next) {
        var data = res.data.data;
        res.data = {
            list: data.data || [],
            more: data.condition.more
        };
        res.type(req.xhr ? 'ejson' : 'html');
        res.template = tpl;
        next();
    };
};
