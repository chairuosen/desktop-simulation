<style lang="less" rel="stylesheet/less">
    .file-item {
        position:absolute;
        /*border:1px dashed #fff;*/
        &.selected{
            .file-body{
                /*border:2px solid rgba(43, 115, 199, 0.36);*/
                /*background:rgba(43, 115, 199, 0.2);*/
                background: rgba(0, 134, 255, 0.27);
            }
        }
        &.dragging{
            opacity:0.6;
        }
        .file-body{
            /*border:2px solid transparent;*/
            border-radius:4px;
            position:absolute;
            top:50%;
            left:50%;
            transform:translateX(-50%) translateY(-50%);
            width:90px;
            .icon{
                height:80px;
                width:100%;
                margin:0 auto;
                background-size:64px;
            }
            .text{
                min-height:20px;
                line-height:20px;
                text-align:center;
                /*margin:0 -10px; */
                overflow: hidden;
                word-wrap: break-word;
                word-break: break-all;
                text-overflow: ellipsis;
                padding-bottom:5px;
            }
        }
    }
</style>
<template>
    <div class="file-item"
         :class="{
         selected:file.selected,
         dragging:dragging
         }"

         @mousedown="mousedownOnFileItem($event);"
         @contextmenu="contextmenuOnFileItem($event,file)"
    >
        <div class="file-body"
             @click="select(file)"
             @dblclick="file.open()"
             @dragstart="onDragstart($event,file);"
             @dragend="onDragend();"
             draggable="true"
        >
            <div class="icon {{file.icon}}">

            </div>
            <div class="text">
                {{file.name}}
            </div>
        </div>
    </div>
</template>
<script>
    var util = require('service/util');
    var appController = require('service/app-controller');

    module.exports = {
        props:{
            file:Object,
            select:Function,
            dragstart:Function
        },
        data: function () {
            return {
                dragging:false
            }
        },
        methods: {
            onDragstart:function ($event,file) {
                this.dragstart($event,file);
                this.dragging = true;
            },
            onDragend:function () {
                this.dragging = false;
            },
            mousedownOnFileItem:function (e) {
                if ( $(e.target).is('.file-item') && e.button==0 ){
                    $event.emit('mousedown:wallpaper',{x:e.clientX,y:e.clientY})
                }else if(e.button==0){
                    $event.emit('mousedown:file',{x:e.clientX,y:e.clientY});
                }
            },
            contextmenuOnFileItem:function (e,file) {
                if ( $(e.target).is('.file-item') ){
                    $event.emit('contextmenu:wallpaper',{x:e.clientX,y:e.clientY})
                }else{
                    $event.emit('contextmenu:file',{x:e.clientX,y:e.clientY,file:file})
                }
            }
        },
        components: {},
        ready: function () {

        }
    }
</script>