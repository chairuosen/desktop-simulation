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

    function clone(a) {
        return JSON.parse(JSON.stringify(a));
    }

    module.exports = {
        data: function () {
            return {
                option:option,
                clipboard:[],
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
            },
            getGridMap:function () {
                var map = [];
                this.files.forEach(function (item) {
                    map[item.x] = map[item.x] || [];
                    map[item.x][item.y] = item ;
                });
                return map;
            },
            clearSelect:function () {
                this.files.map(function (a) {
                    a.selected = false;
                })
            },
            forEachGridEmptyPoint:function (cb) {
                var map = this.getGridMap();
                var x,y;
                var count = 0;
                for(x=0,y=0;x<50;y++){
                    if(y>maxRow-1){
                        y=0;
                        x++;
                    }
                    if(!map[x] || !map[x][y]){

                        if(cb && cb(x,y,count)===false){
                            return;
                        }
                        count++;
                    }
                }
            }
        },
        components: {},
        ready: function () {
            var vm = this;
            $event.on('click:wallpaper',function (e,data) {
                vm.clearSelect();
            });
            $event.on('drop:wallpaper',function (e,data) {
                var targetPosition = getParsedXY(data.x,data.y);
                vm.draggingItem.x = targetPosition.x;
                vm.draggingItem.y = targetPosition.y;
                vm.draggingItem = null;
            });
            $event.on('copy:keyboard',function () {
                vm.clipboard = vm.files.filter(function (a) {
                    return a.selected;
                }).map(function (a) {
                    var b = clone(a)
                    b.copy = true;
                    return b;
                });
            });
            $event.on('cut:keyboard',function () {
                vm.clipboard = vm.files.filter(function (a) {
                    return a.selected;
                }).map(function (a) {
                    var b = clone(a);
                    a.deleted = true;
                    return b;
                });
                vm.files = vm.files.filter(function (a) {
                    return !a.deleted;
                });
            })
            $event.on('paste:keyboard',function () {
                var arr = vm.clipboard;
                vm.clearSelect();
                vm.forEachGridEmptyPoint(function (x,y,index) {
                    var item = arr.pop();
                    item.x = x;
                    item.y = y;
                    item.selected = false;
                    if(item.copy){
                        item.name = item.name + " (2)";
                    }
                    item.copy = false;

                    console.log(item);
                    vm.files.push(item);

                    if(index>=arr.length-1){
                        return false;
                    }
                });
            })
        }
    }
</script>