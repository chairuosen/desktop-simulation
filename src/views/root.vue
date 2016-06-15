<style lang="less" rel="stylesheet/less">
    @import "../main";
</style>
<template>
    <div class="root">
        <wallpaper class="scope"></wallpaper>
        <file class="scope" :apps.sync="apps"></file>
        <selection class="scope"></selection>
        <application class="scope" :apps.sync="apps"></application>
        <taskbar class="scope" :apps.sync="apps"></taskbar>
        <mousemenu class="scope"></mousemenu>
    </div>
</template>

<script>
    var apps = require('service/app-controller').apps;

    require('service/keyboard').init();
    require('service/global-var');
    module.exports = {
        el:function () {
            return "body";
        },
        data:function () {
            return {
                apps:apps
            }
        },
        replace: false,
        components:{
            wallpaper:require('views/wallpaper.vue'),
            file:require('views/file.vue'),
            selection:require('views/selection.vue'),
            application:require('views/application.vue'),
            taskbar:require('views/taskbar.vue'),
            mousemenu:require('views/mouse-menu.vue')
        },
        ready:function () {
            var vm = this;
        }
    };
</script>