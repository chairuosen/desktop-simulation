var util = require('service/util');
var App = require('service/app');
var File = require('service/file');

var _this = {
    apps:[],
    files:require('data/files.js').map(function(a){
        return new File(a);
    }),
    openApp:function (app) {
        if(this.apps.indexOf(app)==-1){
            this.apps.push(app);
        }
        app.show();
    },
    openFile:function (file) {
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
        var app = new App(options);

        if(app.singleton && file._openedApp){
            app = file._openedApp;
        }

        this.openApp(app);

        file.selected = false;
        if(app.singleton){
            file._openedApp = app;
        }
    },
    checkFocus:function (app) {
        this.apps.sort(function (a,b) {
            if(a===app){
                b.blur();
                return 1;
            }else if(b===app){
                a.blur();
                return -1;
            }else{
                a.blur();
                b.blur();
                return 0;
            }

        });
    },
    checkClose:function () {
        util.arrayRemove(this.apps,function (a) {
            return a._close;
        });
    },
};

$event.on('app:close',function () {
    _this.checkClose();
});
$event.on('app:focus',function (app) {
    _this.checkFocus(app);
});
$event.on('mousedown:wallpaper',function () {
    _this.apps.forEach(function (app) {
        app._focus = false;
    })
})

module.exports = _this;