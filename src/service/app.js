var count = 0;

function delay(cb,n){
    setTimeout(cb,n||0);
}
module.exports = {
    App:function (o) {
        var _default = {
            show: true,
            title: "app",
            icon:"",
            actived: false,
            type: null,
            top: 100 + count * 2,
            left: 100 + count * 2,
            height: 400,
            width: 600,
            data:null,
            animating:false,
            maximized: false,
            oldPosition: null
        };
        $.extend(_default,o);
        $.extend(this,_default);

        this.hide = function () {
            this.show = false;
            this.actived = false;
        };

        this.maximize = function () {
            var _this = this;
            if(_this.maximized && _this.oldPosition){
                _this.animating = true;
                delay(function () {
                    _this.maximized = false;

                    _this.top = _this.oldPosition.top;
                    _this.left = _this.oldPosition.left;
                    _this.height = _this.oldPosition.height;
                    _this.width = _this.oldPosition.width;

                    _this.oldPosition = null;
                    delay(function () {
                        _this.animating = false;
                    },500)
                })

            }else{
                _this.animating = true;
                delay(function () {
                    _this.maximized = true;
                    _this.oldPosition = {
                        top:_this.top,
                        left:_this.left,
                        height:_this.height,
                        width:_this.width
                    };
                    _this.top = 0;
                    _this.left = 0;
                    _this.height = window._h;
                    _this.width = window._w;
                    delay(function () {
                        _this.animating = false;
                    },500);
                })
            }
        }

        this.set = function (key,value) {
            if(['height','width'].indexOf(key)>=0){
                this.maximized = false;
            }
            this[key] = value;
        }

        this.sortKey = count++;
    }
}