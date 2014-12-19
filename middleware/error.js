/**
 * @file 错误处理
 * @author treelite(c.xinle@gmail.com)
 */

module.exports = function (error, req, res, next) {
    console.log(error);
    res.send('Error');
};
