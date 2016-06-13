var count = 0;
module.exports = {
    App:function (o) {
        var _default = {
            show:true,
            title:"app",
            actived:false,
            type:null,
            top:200 + count*20,
            left:200 + count*20,
            height:400,
            width:400
        };
        $.extend(_default,o);
        $.extend(this,_default);
        this.sortKey = count++;
    }
}