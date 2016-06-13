<style lang="less" rel="stylesheet/less">
    .mouse-action-section{
        position:relative;
    }
    .selection-section{
        position:absolute;
        border:1px solid rgba(50, 70, 100, 0.5);
        background:rgba(142, 199, 228, 0.5);
    }
</style>
<template>
    <div class="mouse-action-section">
        <div class="selection-section" 
            v-if="startSelection"
             :style="getSelectionStyle();"
        ></div>
    </div>
</template>

<script>
    var util = require('service/util');
    module.exports = {
        data: function () {
            return {
                startSelection:false,
                startPosition:{},
                currentPosition:{},
                topLeft:null,
                bottomRight:null
            }
        },
        methods: {
            getSelectionStyle:function () {
                var a = this.startPosition;
                var b = this.currentPosition;
                var topLeft={
                    x:Math.min(a.x,b.x),
                    y:Math.min(a.y,b.y)
                }
                var bottomRight={
                    x:Math.max(a.x,b.x),
                    y:Math.max(a.y,b.y)
                };
                this.topLeft = topLeft;
                this.bottomRight = bottomRight;
                return {
                    top:topLeft.y+"px",
                    left:topLeft.x + "px",
                    height:bottomRight.y - topLeft.y + "px",
                    width:bottomRight.x - topLeft.x + "px"
                };
            }
        },
        components: {},
        ready: function () {
            var vm = this;
            $event.on('mousedown:file mousedown:wallpaper',function (e,data) {
                vm.startSelection = true;
                vm.startPosition = {x:data.x,y:data.y};
                vm.currentPosition = {x:data.x,y:data.y}
            });
            $(window).on('mousemove',function (e) {
                if(vm.startSelection){
                    vm.currentPosition = {x:e.clientX,y:e.clientY};
                }
            })
            $(window).on('mouseup',function (e) {
                if(e.button==0 && vm.startSelection){
                    $event.emit('selection:mouse-action',{
                        topLeft:util.clone(vm.topLeft),
                        bottomRight:util.clone(vm.bottomRight)
                    })
                }
                vm.startSelection = false;
            });

            $event.on('contextmenu:file',function (e,data) {
                console.log('file menu');
            });
            $event.on('contextmenu:wallpaper',function (e,data) {
                console.log('desktop menu');
            });
        }
    }
</script>