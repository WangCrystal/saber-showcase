/**
 * @file 日期格式化
 * @author treelite(c.xinle@gmail.com)
 */

function pad(num) {
    return (num >= 10 ? '' : '0') + num;
}

module.exports = function (source) {
    return source.split(/\s/)[0];
    var time = new Date(source);

    return time.getFullYear()
        + '-'
        + pad(time.getMonth() + 1)
        + '-'
        + pad(time.getDate());
};
