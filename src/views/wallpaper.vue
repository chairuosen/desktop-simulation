<style lang="less" rel="stylesheet/less">
    .wallpaper-section{
        height:100%;
        /*background:url(../images/wall.jpg);*/
        /*background-size:cover;*/
        background:#eee;
    }
</style>
<template>
    <div class="wallpaper-section">
        <div
                class="wallpaper-section"
                @click="emit('click:wallpaper',$event);"
                @drop="drop($event);"
                @dragover="dragover($event)"
                @mousedown="mousedown($event)"
                @mouseup="emit('mouseup:wallpaper',$event);"
        >
        </div>
        <a href="https://github.com/chairuosen/desktop-simulation"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"></a>
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
            },
            mousedown:function (e) {
                if(e.button==2){
                    $event.emit('contextmenu:wallpaper',{x:e.clientX,y:e.clientY})
                }else if(e.button==0){
                    $event.emit('mousedown:wallpaper',{x:e.clientX,y:e.clientY})
                }
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