var util = require('service/util');
var App = require('service/app');
var File = require('service/file');
var Vue = require('vue');
// var storage = require('service/storage');

var sourceFile = require('data/files.js');

var _this = {
    apps:[],
    files:(sourceFile).map(function(a){
        return new File(a);
    }),
    openApp:function (app) {
        if(this.apps.indexOf(app)==-1){
            this.apps.push(app);
        }
        app.show();
    },
    resetAllFile:function () {
        this.files.length = 0;
        sourceFile.forEach(function (a,index) {
            _this.files.push(new File(a))
        });
        $event.emit('file:reset');
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
});
$event.on('window:resize',function () {
    _this.apps.forEach(function (app) {
        app.checkLayout();
    })
});

// var vm = new Vue({
//     data:function () {
//         return {
//             files:_this.files
//         }
//     }
// });
// vm.$watch(function () {
//     return JSON.stringify(this.files);
// },function () {
//     storage.set('files',this.files);
// });

module.exports = _this;