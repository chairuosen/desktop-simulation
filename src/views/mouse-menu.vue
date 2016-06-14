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
                :data.sync="menu.data",
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
                    data:null
                }
            }
        },
        methods: {},
        components: {
            menu:require('components/context-menu.vue')
        },
        ready: function () {
            var vm = this;
            $event.on('contextmenu:file',function (e,data) {
//                console.log('file menu',data);
                vm.menu.data = menuData.file;
                vm.menu.position = data;
            });
            $event.on('contextmenu:wallpaper',function (e,data) {
//                console.log('desktop menu');
                vm.menu.data = menuData.wallpaper;
                vm.menu.position = data;
            });
            $event.on('mousedown:wallpaper',function (e,data) {
                vm.menu.data = null;
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