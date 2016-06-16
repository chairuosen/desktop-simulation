<style lang="less" rel="stylesheet/less">
    @import "../global";
    .mouse-action-section{
        position:relative;
    }
    .selection-section{
        position:absolute;
        border:1px solid fade(darken(@blue,10%),60);
        background:fade(@blue,20)
    }
</style>
<template>
    <div class="mouse-action-section">
        <div
                class="selection-section"
                v-show="selection.startSelection"
                :style="getSelectionStyle();"
        ></div>
    </div>
</template>

<script>
    var util = require('service/util');

    module.exports = {
        data: function () {
            return {
                selection:{
                    startSelection:false,
                    startPosition:{},
                    currentPosition:{},
                    topLeft:null,
                    bottomRight:null,
                }
            }
        },
        methods: {
            getSelectionStyle:function () {
                var a = this.selection.startPosition;
                var b = this.selection.currentPosition;
                var topLeft={
                    x:Math.min(a.x,b.x),
                    y:Math.min(a.y,b.y)
                }
                var bottomRight={
                    x:Math.max(a.x,b.x),
                    y:Math.max(a.y,b.y)
                };
                this.selection.topLeft = topLeft;
                this.selection.bottomRight = bottomRight;
                return {
                    top:topLeft.y+"px",
                    left:topLeft.x + "px",
                    height:bottomRight.y - topLeft.y + "px",
                    width:bottomRight.x - topLeft.x + "px"
                };
            }
        },
        components: {

        },
        ready: function () {
            var vm = this;
            $event.on('mousedown:wallpaper',function (data) {
                vm.selection.startSelection = true;
                vm.selection.startPosition = {x:data.x,y:data.y};
                vm.selection.currentPosition = {x:data.x,y:data.y}
            });
            $(window).on('mousemove',function (e) {
                if(vm.selection.startSelection){
                    var x = e.clientX;
                    var y = e.clientY;
                    var maxX = window._w;
                    var maxY = window._h;
                    x = Math.min(maxX,x);
                    y = Math.min(maxY,y);

                    vm.selection.currentPosition = {x:x,y:y};
                }
            })
            $(window).on('mouseup',function (e) {
                if(e.button==0 && vm.selection.startSelection){
                    $event.emit('selection:mouse-action',{
                        topLeft:util.clone(vm.selection.topLeft),
                        bottomRight:util.clone(vm.selection.bottomRight)
                    })
                }
                vm.selection.startSelection = false;
            });


        }
    }
</script>