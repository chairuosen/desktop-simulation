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
    this.selected = false;
}
File.prototype.open = function () {
    var file = this;
    var options = {
        title:file.name,
        type:file.app,
        icon:file.icon
    };
    if(file.options){
        if(typeof file.options == 'function'){
            file.options = file.options();
        }
        $.extend(options,file.options)
    }

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