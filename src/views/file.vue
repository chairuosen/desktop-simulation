<style lang="less" rel="stylesheet/less">
    .file-container{

    }
    .file-item {
        position:absolute;
        /*border:1px dashed #fff;*/
        &.selected{
            .file-body{
                border:2px solid rgba(43, 115, 199, 0.36);
                background:rgba(43, 115, 199, 0.2);
            }
        }
        .file-body{
            border-radius:3px;
            position:absolute;
            top:50%;
            left:50%;
            transform:translateX(-50%) translateY(-50%);
            height:120px;
            width:100px;
            .icon{
                height:80%;
                width:100%;
                margin:0 auto;
                background:url(../images/file.png) no-repeat center center;
                background-size:64px;
            }
            .text{
                height:20%;
                line-height:14px;
                text-align:center;
            }
        }
    }
</style>
<template>
    <div class="file-container">
        <div class="file-item" v-for="item in files"
             :class="{selected:item.selected}"
             :style="{
                height:option.cell.height+'px',
                width:option.cell.width+'px',
                top:item.y*option.cell.height +'px',
                left:item.x*option.cell.width +'px'
             }">
            <div class="file-body"
                 @click="select(item)"
                 @dragstart="dragstart($event,item)"
                 draggable="true"
            >
                <div class="icon">

                </div>
                <div class="text">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var option = {
        cell:{
            height:130,
            width:130
        }
    };
    var h = $(window).height();
    var maxRow = Math.floor(h/option.cell.height);

    function getParsedXY(x,y){
        x=x-option.cell.width/2;
        y=y-option.cell.height/2;
        return {
            x:Math.round(x/option.cell.width),
            y:Math.round(y/option.cell.height)
        };
    }

    module.exports = {
        data: function () {
            return {
                option:option,
                draggingItem:null,
                files:require('data/files.js').map(function (item,index) {
                    var x = Math.floor(index/maxRow);
                    var y = index%maxRow;
                    item.x = x;
                    item.y = y;
                    item.selected = false;
                    return item;
                })
            }
        },
        methods: {
            select:function (item) {
                this.files.map(function (a) {
                    a.selected = false;
                })
                item.selected = !item.selected;
            },
            dragstart:function (e,item) {
                this.draggingItem = item;
            }
        },
        components: {},
        ready: function () {
            var vm = this;
            $event.on('click:wallpaper',function (e,data) {
                vm.files.map(function (a) {
                    a.selected = false;
                })
            });
            $event.on('drop:wallpaper',function (e,data) {
                var targetPosition = getParsedXY(data.x,data.y);
                vm.draggingItem.x = targetPosition.x;
                vm.draggingItem.y = targetPosition.y;
                vm.draggingItem = null;
            })
        }
    }
</script>