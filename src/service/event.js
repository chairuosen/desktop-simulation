var $ = require('jquery');
module.exports = {
    on:function (name,cb) {
        $(document).on(name,cb);
    },
    emit:function (name,data) {
        $(document).trigger(name,data);
    }
}