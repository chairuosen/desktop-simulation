function arrRemove(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

module.exports = {
    clone:function clone(a) {
        return JSON.parse(JSON.stringify(a));
    },
    arrayRemove:function (arr,cb) {
        var targetArr = arr.filter(cb);
        arrRemove.apply(null,[arr].concat(targetArr));
    }
}