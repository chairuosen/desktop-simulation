<style lang="less" rel="stylesheet/less">
    .wallpaper{
        height:100%;
        background:url(../images/wall.jpg);
    }
</style>
<template>
    <div class="wallpaper" @click="click($event);">

    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {}
        },
        methods: {
            click:function (e) {
                $event.emit('click:wallpaper',{x:e.clientX,y:e.clientY});
            }
        },
        components: {},
        ready: function () {

        }
    }
</script>