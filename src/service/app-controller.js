var App = require('service/app').App;

var _this = {
    apps:[],
    openApp:function (app) {
        if(this.apps.indexOf(app)==-1){
            this.apps.push(app);
        }
        this.switchApp(app);
    },
    switchApp:function (app) {
        app.show = true;
        // var otherApps = this.apps.filter(function (a) {
        //     a.actived = false;
        //     return a!==app;
        // });
        // app.actived = true;
        // otherApps.push(app);
        // this.apps = otherApps;

        app.actived = true;
        this.apps.sort(function (a,b) {
            a.actived = false;
            b.actived = false;

            if(a===app){
                a.actived = true;
                return 1;
            }
            if(b===app){
                b.actived = true;
                return -1;
            }
            return 0;
        })

        $event.emit('app:switch',app);
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

module.exports = _this;