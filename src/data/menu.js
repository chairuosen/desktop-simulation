var appController = require('service/app-controller');
module.exports = {
    file:[
        {
            text:"打开",
            type:"open",
            disabled:false,
            callback:function () {
                $event.emit('open:menu')
            }
        },
        {
            text:"复制",
            type:"copy",
            disabled:false,
            callback:function () {
                $event.emit('copy:menu')
            }
        },
        {
            type:"divide"
        },
        {
            text:"删除",
            type:"delete",
            disabled:false,
            callback:function () {
                $event.emit('delete:menu')
            }
        },
    ],
    wallpaper:[
        {
            text:"刷新",
            type:"refresh",
            disabled:false,
            callback:function () {
//                console.log(1);
                $event.emit('refresh:menu')
            }
        },
        {
            text:'全选',
            type:"selectAll",
            callback:function () {
                $event.emit('selectAll:menu');
            }
        },
        {
            text:"粘贴",
            type:"paste",
            disabled:true,
            callback:function () {
                $event.emit('paste:menu')
            }
        },
        {
            type:'divide'
        },
        {
            text:"恢复图标",
            type:"resetAllFile",
            callback:function () {
                appController.resetAllFile();
            }
        }
    ]
}