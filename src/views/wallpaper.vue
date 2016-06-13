<style lang="less" rel="stylesheet/less">
    .wallpaper{
        height:100%;
        background:url(../images/wall.jpg);
        background-size:cover;
    }
</style>
<template>
    <div
            class="wallpaper"
            @click="emit('click:wallpaper',$event);"
            @drop="drop($event);"
            @dragover="dragover($event)"
            @mousedown="emit('mousedown:wallpaper',$event);"
            @mouseup="emit('mouseup:wallpaper',$event);"
            v-el:wallpaper
    >

    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {}
        },
        methods: {
            emit:function (name,e) {
                if(e.button==0){
                    $event.emit(name,{x:e.clientX,y:e.clientY});
                }
            },
            drop:function (e) {
                $event.emit('drop:wallpaper',{x:e.clientX,y:e.clientY});
                e.preventDefault();
            },
            dragover:function (e) {
                e.preventDefault();
            }
        },
        components: {},
        ready: function () {
            $(window).on('contextmenu',function (e) {
                e.preventDefault();
            })
        }
    }
</script>