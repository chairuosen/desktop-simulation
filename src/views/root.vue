<style lang="less" rel="stylesheet/less">
    @import "../main";
</style>
<template>
    <div class="root">
        <wallpaper class="scope"></wallpaper>
        <files class="scope" :files.sync="files"></files>
        <selection class="scope"></selection>
        <application class="scope" :apps.sync="apps"></application>
        <taskbar class="scope" :apps.sync="apps"></taskbar>
        <mousemenu class="scope"></mousemenu>
    </div>
</template>

<script>
    var appController = require('service/app-controller');

    require('service/keyboard').init();
    require('service/global-var');
    module.exports = {
        el:function () {
            return "body";
        },
        data:function () {
            return {
                apps:appController.apps,
                files:appController.files
            }
        },
        replace: false,
        components:{
            wallpaper:require('views/wallpaper.vue'),
            files:require('views/file.vue'),
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