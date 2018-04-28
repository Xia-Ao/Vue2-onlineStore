const digitsRE = /(\d{3})(?=\d)/g;      // 匹配三位数字

export function currency (value, currency, decimals) {
    value = parseFloat(value);
    if (!isFinite(value) || (!value && value !== 0)) return '';
    currency = currency != null ? currency : '$';
    decimals = decimals != null ? decimals : 2;
    var stringified = Math.abs(value).toFixed(decimals);
    var _int = decimals
        ? stringified.slice(0, -1 - decimals)
        : stringified;
    var i = _int.length % 3;
    var head = i > 0
        ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
        : '';
    var _float = decimals
        ? stringified.slice(-1 - decimals)
        : '';
    var sign = value < 0 ? '-' : '';

    // 循环_int切分数字三个一组， 返回一个拼接起来的字符串
    return sign + currency + head +
        _int.slice(i).replace(digitsRE, '$1,') +
        _float;
}
