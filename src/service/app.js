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

        this.hide = function () {
            this.show = false;
            this.actived = false;
        };

        this.maximize = function () {
            this.top = 0;
            this.left = 0;
            this.height = window._h;
            this.width = window._w;
        }

        this.sortKey = count++;
    }
}