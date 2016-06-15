var count = 0;

function delay(cb,n){
    setTimeout(cb,n||0);
}

function App(o) {
    var _default = {
        show: true,
        title: "app",
        icon:"",
        focus: false,
        type: null,
        top: 100 + count * 5,
        left: 100 + count * 5,
        height: 400,
        width: 600,
        data:null,
        animating:false,
        maximized: false,
        oldPosition: null,
        resizable:true,
        singleton:false,
        closed:false
    };
    $.each(o,function (k,v) {
        if(typeof v == 'function'){
            o[k] = v();
        }
    });
    $.extend(_default,o);
    $.extend(this,_default);

    this.sortKey = count++;
}

App.prototype.set = function (key,value) {
    var isResize = ['height','width'].indexOf(key)>=0;
    if(isResize){
        this.maximized = false;

        if(this.resizable){
            this[key] = value;
        }
    }else{
        this[key] = value;
    }
}

App.prototype.hide = function () {
    this.show = false;
    this.focus = false;
};

App.prototype.close = function () {
    this.closed = true;
    $event.emit('app:close',this);
}

App.prototype.maximize = function () {
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

module.exports = {
    App:App
}