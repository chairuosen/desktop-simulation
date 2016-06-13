<style lang="less" rel="stylesheet/less">
    .mouse-action-section{
        position:relative;
    }
    .selection-section{
        position:absolute;
        border:1px solid rgba(50, 70, 100, 0.5);
        background:rgba(142, 199, 228, 0.5);
    }
    .context-menu{
        position:absolute;
    }
</style>
<template>
    <div class="mouse-action-section">
        <div
                class="selection-section"
                v-if="selection.startSelection"
                :style="getSelectionStyle();"
        ></div>
        <menu
                v-if="menu.data && menu.data.length"
                class="context-menu"
                :data.sync="menu.data",
                :style="{
                    top:menu.position.y+'px',
                    left:menu.position.x+'px'
                }"
        ></menu>
    </div>
</template>

<script>
    var util = require('service/util');

    var menuForFile = [
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
    ];

    var menuForDesktop = [
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
    ];

    module.exports = {
        data: function () {
            return {
                selection:{
                    startSelection:false,
                    startPosition:{},
                    currentPosition:{},
                    topLeft:null,
                    bottomRight:null,
                },
                menu:{
                    position:{},
                    data:null
                }
            }
        },
        methods: {
            getSelectionStyle:function () {
                var a = this.selection.startPosition;
                var b = this.selection.currentPosition;
                var topLeft={
                    x:Math.min(a.x,b.x),
                    y:Math.min(a.y,b.y)
                }
                var bottomRight={
                    x:Math.max(a.x,b.x),
                    y:Math.max(a.y,b.y)
                };
                this.selection.topLeft = topLeft;
                this.selection.bottomRight = bottomRight;
                return {
                    top:topLeft.y+"px",
                    left:topLeft.x + "px",
                    height:bottomRight.y - topLeft.y + "px",
                    width:bottomRight.x - topLeft.x + "px"
                };
            }
        },
        components: {
            menu:require('components/context-menu.vue')
        },
        ready: function () {
            var vm = this;
            $event.on('mousedown:file mousedown:wallpaper',function (e,data) {
                vm.selection.startSelection = true;
                vm.selection.startPosition = {x:data.x,y:data.y};
                vm.selection.currentPosition = {x:data.x,y:data.y}
            });
            $(window).on('mousemove',function (e) {
                if(vm.selection.startSelection){
                    vm.selection.currentPosition = {x:e.clientX,y:e.clientY};
                }
            })
            $(window).on('mouseup',function (e) {
                if(e.button==0 && vm.selection.startSelection){
                    $event.emit('selection:mouse-action',{
                        topLeft:util.clone(vm.selection.topLeft),
                        bottomRight:util.clone(vm.selection.bottomRight)
                    })
                }
                vm.selection.startSelection = false;
            });

            $event.on('contextmenu:file',function (e,data) {
//                console.log('file menu',data);
                vm.menu.data = menuForFile;
                vm.menu.position = data;
            });
            $event.on('contextmenu:wallpaper',function (e,data) {
//                console.log('desktop menu');
                vm.menu.data = menuForDesktop;
                vm.menu.position = data;
                console.log(1);
            });
            $event.on('mousedown:wallpaper',function (e,data) {
                vm.menu.data = null;
            });
            var pasteMenu = menuForDesktop.filter(function (a) {
                return a.type=='paste'
            })[0];
            $event.on('copy:keyboard copy:menu cut:keyboard cut:menu',function () {
                pasteMenu.disabled = false;
            });
            $event.on('paste:keyboard paste:menu',function () {
                pasteMenu.disabled = true;
            })
        }
    }
</script>