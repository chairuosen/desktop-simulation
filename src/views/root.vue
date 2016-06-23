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
        <a href="https://github.com/chairuosen/desktop-simulation"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"></a>
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