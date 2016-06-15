<style lang="less" rel="stylesheet/less">
    .file-item {
        position:absolute;
        /*border:1px dashed #fff;*/
        &.selected{
            .file-body{
                border:2px solid rgba(43, 115, 199, 0.36);
                background:rgba(43, 115, 199, 0.2);
            }
        }
        .file-body{
            border:2px solid transparent;
            border-radius:3px;
            position:absolute;
            top:50%;
            left:50%;
            transform:translateX(-50%) translateY(-50%);
            width:90px;
            .icon{
                height:80px;
                width:100%;
                margin:0 auto;
                background-size:64px;
            }
            .text{
                min-height:20px;
                line-height:20px;
                text-align:center;
                /*margin:0 -10px; */
                overflow: hidden;
                word-wrap: break-word;
                word-break: break-all;
                text-overflow: ellipsis;
                padding-bottom:5px;
            }
        }
    }
</style>
<template>
    <div class="file-section">
        <div class="file-item" v-for="item in files"
             :class="{selected:item.selected}"
             :style="{
                height:option.cell.height+'px',
                width:option.cell.width+'px',
                top:item.y*option.cell.height +'px',
                left:item.x*option.cell.width +'px'
             }"
             @mousedown="mousedownOnFileItem($event);"
             @contextmenu="contextmenuOnFileItem($event,item)"
        >
            <div class="file-body"
                 @click="select(item)"
                 @dblclick="openApp(item)"
                 @dragstart="dragstart($event,item)"
                 draggable="true"
            >
                <div class="icon {{item.icon}}">

                </div>
                <div class="text">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var App = require('service/app').App;
    var appController = require('service/app-controller');

    var option = {
        cell:{
            height:130,
            width:130
        }
    };
    var maxRow = Math.floor(window._h/option.cell.height);

    function getParsedXY(x,y,origin){
        x=x-option.cell.width/2;
        y=y-option.cell.height/2;
        var o = {
            x:x/option.cell.width,
            y:y/option.cell.height
        };
        if(!origin){
            o.x = Math.round(o.x);
            o.y = Math.round(o.y);
        }
        return o;
    }

    var util = require('service/util');

    var commandKeyPressed = false;
    $(window).on('keydown',function (e) {
        if(e.keyCode == require('service/keyboard').keyMap.cmd){
            commandKeyPressed = true;
        }
    }).on('keyup',function (e) {
        if(e.keyCode == require('service/keyboard').keyMap.cmd){
            commandKeyPressed = false;
        }
    })

    module.exports = {
        props:{
            apps:Array
        },
        data: function () {
            return {
                option:option,
                clipboard:[],
                draggingItem:null,
                files:require('data/files.js').map(function (item,index) {
                    item.x = Math.floor(index/maxRow);
                    item.y = index%maxRow;
                    item.selected = false;
                    return item;
                })
            }
        },
        methods: {
            openApp:function (file) {
                var options = {
                    title:file.name,
                    type:file.app,
                    icon:file.icon
                };
                if(file.options){
                    $.extend(options,file.options)
                }

                if(file._openedApp && file._openedApp.closed){
                    file._openedApp = null;
                }

                var app = new App(options);

                if(app.singleton && file._openedApp){
                    app = file._openedApp;
                }

                appController.openApp(app);

                file.selected = false;
                file._openedApp = app;
            },
            select:function (item) {
                if( !commandKeyPressed ){
                    this.clearSelect();
                }
                item.selected = !item.selected;
            },
            selectAll:function () {
                this.files.forEach(function (a) {
                    a.selected = true;
                })
            },
            dragstart:function (e,item) {
                this.draggingItem = item;
            },
            getGridMap:function () {
                var map = [];
                this.files.forEach(function (item) {
                    map[item.x] = map[item.x] || [];
                    map[item.x][item.y] = item ;
                });
                return map;
            },
            clearSelect:function () {
                this.files.map(function (a) {
                    a.selected = false;
                })
            },
            forEachGridEmptyPoint:function (cb) {
                var map = this.getGridMap();
                var x,y;
                var count = 0;
                for(x=0,y=0;x<50;y++){
                    if(y>maxRow-1){
                        y=0;
                        x++;
                    }
                    if(!map[x] || !map[x][y]){

                        if(cb && cb(x,y,count)===false){
                            return;
                        }
                        count++;
                    }
                }
            },
            mousedownOnFileItem:function (e) {
                if ( $(e.target).is('.file-item') && e.button==0 ){
                    $event.emit('mousedown:file',{x:e.clientX,y:e.clientY})
                }
            },
            contextmenuOnFileItem:function (e,item) {
                if ( $(e.target).is('.file-item') ){
                    $event.emit('contextmenu:wallpaper',{x:e.clientX,y:e.clientY})
                }else{
                    if( !item.selected ){
                        this.clearSelect();
                        item.selected = true;
                    }
                    $event.emit('contextmenu:file',{x:e.clientX,y:e.clientY})
                }
            }
        },
        components: {},
        ready: function () {
            var vm = this;
            $event.on('mousedown:wallpaper',function (e,data) {
                vm.clearSelect();
            });
            $event.on('drop:wallpaper',function (e,data) {
                var targetPosition = getParsedXY(data.x,data.y);
                vm.draggingItem.x = targetPosition.x;
                vm.draggingItem.y = targetPosition.y;
                vm.draggingItem = null;
            });
            $event.on('copy:keyboard copy:menu',function () {
                vm.clipboard = vm.files.filter(function (a) {
                    return a.selected;
                }).map(function (a) {
                    var b = util.clone(a)
                    b.copy = true;
                    return b;
                });
            });
            $event.on('cut:keyboard cut:menu',function () {
                vm.clipboard = vm.files.filter(function (a) {
                    return a.selected;
                }).map(function (a) {
                    var b = util.clone(a);
                    a.deleted = true;
                    return b;
                });
                vm.files = vm.files.filter(function (a) {
                    return !a.deleted;
                });
            });
            $event.on('delete:menu delete:keyboard',function () {
                vm.files = vm.files.filter(function (a) {
                    return !a.selected;
                })
            });
            $event.on('selectAll:keyboard selectAll:menu',function () {
                vm.selectAll();
            })
            $event.on('paste:keyboard paste:menu',function () {
                var arr = vm.clipboard;
                vm.clearSelect();
                vm.forEachGridEmptyPoint(function (x,y,index) {
                    var item = arr.shift();
                    item.x = x;
                    item.y = y;
                    item.selected = false;
                    if(item.copy){
                        item.name = item.name + " (2)";
                    }
                    item.copy = false;

                    console.log(item);
                    vm.files.push(item);

                    if(!arr.length){
                        return false;
                    }
                });
            });
            
            $event.on('selection:mouse-action',function (e,data) {
                var a = getParsedXY(data.topLeft.x,data.topLeft.y,true);
                var b = getParsedXY(data.bottomRight.x,data.bottomRight.y,true);
                var yRange = [a.y,b.y];
                var xRange = [a.x,b.x];
                vm.files.forEach(function (item) {
                    item.selected = false;
                    if(item.x>=xRange[0]  && item.x<=xRange[1]){
                        if(item.y>=yRange[0] && item.y<=yRange[1] ){
                            item.selected = true;
                        }
                    }
                })
            });
            $event.on('contextmenu:wallpaper',function () {
                vm.clearSelect();
            })
        }
    }
</script>