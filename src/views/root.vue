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

</style>
<template>
    <div class="root">
        <wallpaper class="scope"></wallpaper>
        <file class="scope" :apps.sync="apps"></file>
        <action class="scope"></action>
        <application class="scope" :apps.sync="apps"></application>
        <taskbar class="scope" :apps.sync="apps"></taskbar>
    </div>
</template>

<script>
    var App = require('service/app').App;
    var apps = [new App({
        title:"test",
        type:"browser"
    })];

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
            action:require('views/action.vue'),
            application:require('views/application.vue'),
            taskbar:require('views/taskbar.vue')
        },
        ready:function () {
            var vm = this;
            vm.$on('switchApp',function (data) {
                vm.$broadcast('switchApp',data);
            })
        }
    };
</script>