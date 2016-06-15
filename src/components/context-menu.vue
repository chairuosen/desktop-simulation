<style lang="less" rel="stylesheet/less">
    ._context-menu{
        background:rgba(255,255,255,0.8);
        border-radius: 4px;
        ul{
            width:100px;
            padding:5px 0;
            list-style: none;
            .list-item{
                cursor: default;
                color:#333;
                padding: 0 10px;
                &:hover{
                    background:#4b8de4;
                    color:#fff;
                }
                &.disabled{
                    color:#999;
                }
            }
            .divide{
                border-top:1px solid #ccc;
                margin:5px;
            }
        }
    }
</style>
<template>
    <div class="_context-menu">
        <ul>
            <li
                    v-for="item in data"
                    :class="{disabled:item.disabled,divide:item.type=='divide','list-item':item.type!=='divide'}"
                    @click="click(item)"
            >
                {{item.text}}
            </li>
        </ul>
    </div>
</template>

<script>
    module.exports = {
        props:{
            data:Array,
            file:Object
        },
        data: function () {
            return {}
        },
        methods: {
            click:function (item) {
                if(item.disabled) return;
                if(item.callback){
                    item.callback(this.file);
                }
                this.data = null;
            }
        },
        components: {},
        ready: function () {

        }
    }
</script>