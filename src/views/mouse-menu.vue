<style lang="less" rel="stylesheet/less">
    .context-menu{
        position:absolute;
    }
</style>
<template>
    <div class="mouse-action-section">
        <menu
                v-if="menu.data && menu.data.length"
                class="context-menu"
                :data.sync="menu.data"
                :file="menu.file"
                :style="{
                    top:menu.position.y+'px',
                    left:menu.position.x+'px'
                }"
        ></menu>
    </div>
</template>
<script>
    var menuData = require('data/menu');
    module.exports = {
        data: function () {
            return {
                menu:{
                    position:{},
                    file:null,
                    data:null
                }
            }
        },
        methods: {
            hide:function () {
                this.menu.data = null;
            }
        },
        components: {
            menu:require('components/context-menu.vue')
        },
        ready: function () {
            var vm = this;
            $event.on('contextmenu:file',function (data) {
//                console.log('file menu',data);
                vm.menu.data = menuData.file;
                vm.menu.file = data.file;
                vm.menu.position = {x:data.x,y:data.y};
            });
            $event.on('contextmenu:wallpaper',function (data) {
//                console.log('desktop menu');
                vm.menu.data = menuData.wallpaper;
                vm.menu.file = null;
                vm.menu.position = {x:data.x,y:data.y};
            });
            $event.on('mousedown:wallpaper mousedown:file mousedown:taskbar',function (data) {
                vm.hide();
            });
            var pasteOption = menuData.wallpaper.filter(function (a) {
                return a.type=='paste'
            })[0];
            $event.on('copy:keyboard copy:menu cut:keyboard cut:menu',function () {
                if(pasteOption){
                    pasteOption.disabled = false;
                }
            });
            $event.on('paste:keyboard paste:menu',function () {
                if(pasteOption){
                    pasteOption.disabled = true;
                }
            })
        }
    }
</script>