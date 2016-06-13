<style lang="less" rel="stylesheet/less">
    *{
        margin:0;
        padding:0;
        border:none;
        box-sizing:border-box;
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
        <file class="scope"></file>
        <!--<action class="scope"></action>-->
    </div>
</template>

<script>
    require('service/keyboard').init();
    module.exports = {
        el:function () {
            return "body";
        },
        replace: false,
        components:{
            wallpaper:require('views/wallpaper.vue'),
            file:require('views/file.vue'),
            action:require('views/action.vue')
        },
        ready:function () {

        }
    };
</script>