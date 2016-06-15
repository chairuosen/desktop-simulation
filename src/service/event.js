var $ = require('jquery');
module.exports = {
    on:function (name,cb) {
        $(document).on(name,function (e,data){
            cb(data);
        });
    },
    emit:function (name,data) {
        $(document).trigger(name,data);
    }
}