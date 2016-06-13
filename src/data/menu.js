module.exports = {
    file:[
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
    ]
}