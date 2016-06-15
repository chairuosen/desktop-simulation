
var _this = {
    apps:[],
    openApp:function (app) {
        if(this.apps.indexOf(app)==-1){
            this.apps.push(app);
        }
        this.switchApp(app);
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

        if(file._openedApp && file._openedApp.closed){
            file._openedApp = null;
        }
        var App = require('service/app').App;
        var app = new App(options);

        if(app.singleton && file._openedApp){
            app = file._openedApp;
        }

        this.openApp(app);

        file.selected = false;
        file._openedApp = app;
    },
    switchApp:function (app) {
        app.showUp();
        $event.emit('app:switch',app);
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
        // this.apps = this.apps.filter(function (a) {
        //     return !a.closed;
        // });
        var closedApp =  this.apps.filter(function (a) {
            return a.closed;
        });
        var index = this.apps.indexOf(closedApp[0]);
        this.apps.splice(index,1);
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