<style lang="less" rel="stylesheet/less">
    *{
        margin:0;
        padding:0;
        border:none;
        box-sizing:border-box;
        -webkit-user-select:none;
    }
    html,body{
        height:100%;
        width:100%;
    }
    .root{
        height:100%;
        width:100%;
        position:relative;
        .scope{
            position:absolute;
            top:0;
            left:0;
            width:100%;
        }
    }

    .icon{
        background:url(../images/file.png) no-repeat center center;
        &.firefox{
            background-image:url(../images/firefox.png);
        }
        &.chrome{
            background-image:url(../images/chrome.png);
        }
        &.safari{
            background-image:url(../images/safari.png);
        }
    }

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