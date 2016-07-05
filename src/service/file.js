function File(o){
    $.extend(this,o);
    if(!this.x){
        this.x = 0;
    }
    if(!this.y){
        this.y = 0;
    }
    if(!this.inPosition){
        this.inPosition = false;
    }
    this._sourceData = o;
    this.selected = false;
}
File.prototype.open = function () {
    var file = this;
    var options = {
        title:file.name,
        type:file.app,
        icon:file.icon
    };
    $.extend(options,file.getOptions());

    if(file._openedApp && file._openedApp._close){
        file._openedApp = null;
    }
    var App = require('service/app.js');
    var app = new App(options);

    if(app.singleton && file._openedApp){
        app = file._openedApp;
    }

    require('service/app-controller').openApp(app);

    file.selected = false;
    if(app.singleton){
        file._openedApp = app;
    }
};
File.prototype.getOptions = function () {
    var options = {};
    if(this.options){
        options = this.options;
        if(typeof this.options == 'function'){
            options = this.options();
        }
        options = $.extend({},options);

        for (var k in options){
            if(typeof options[k] == "function" ){
                options[k] = options[k]();
            }
        }
    }
    return options;
};
File.prototype.select = function () {
    this.selected = !this.selected;
};

File.prototype.clone = function () {
    var _this = this;
    var newObject = {};
    $.each(_this,function (k,v) {
        if(_this.hasOwnProperty(k)){
            newObject[k] = v;
        }
    });
    return new File(newObject);
};

module.exports = File;