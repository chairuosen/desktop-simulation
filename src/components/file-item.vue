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
    
</template>
<script>
    module.exports = {
        data: function () {
            return {}
        },
        methods: {},
        components: {},
        ready: function () {

        }
    }
</script>