/**
 * @file 公共render
 * @author treelite(c.xinle@gmail.com)
 */

module.exports = function (tpl) {
    return function (req, res, next) {
        res.template = tpl;
        next();
    };
};
