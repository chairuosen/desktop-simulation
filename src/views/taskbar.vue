<style lang="less" rel="stylesheet/less">
    @h:40px;
    .taskbar-section{
        width:100%;
        height:@h;
        background:#444;
        position:absolute;
        bottom:0;
        top:auto !important;
        left:0;
    }
    .app-list{
        overflow:hidden;
        height:@h;
        cursor: default;
        .app-item{
            float:left;
            height:@h;
            min-width:100px;
            padding:0 20px 0 15px;
            text-align:center;
            line-height:@h;
            color:#999;
            background:#505050;
            margin-right:2px;
            &.actived{
                background:#333;
                color:#fff;
            }
            .icon{
                display:inline-block;
                width:25px;
                height:25px;
                margin-right:5px;
                background-size:cover;
                vertical-align: top;
                position:relative;
                top:7px;
            }
        }
    }
</style>
<template>
    <div class="taskbar-section">
        <div class="app-list">
            <div
                    class="app-item"
                    :class="{actived:app.actived}"
                    v-for="app in sortedApps"
                    @click="click(app)"
            >
                <span class="icon {{app.icon}}"></span>{{app.title}}
            </div>
        </div>
    </div>
</template>
<script>
    var util = require('service/util');
    var appController = require('service/app-controller');

    function getNewArray(arr) {
        var _arr=[];
        arr.forEach(function (a) {
            _arr.push(a);
        });
        return _arr;
    }

    module.exports = {
        props:{
            apps:Array
        },
        computed:{
            sortedApps:function () {
                var apps = getNewArray(this.apps);
                apps.sort(function (a,b) {
                    return a.sortKey > b.sortKey ? 1 : a.sortKey < b.sortKey ? -1 : 0;
                });
                return apps;
            }
        },
        data: function () {
            return {}
        },
        methods: {
            click:function (app) {
                if(app.actived){
                    app.hide();
                }else{
                    appController.switchApp(app)
                }
            }
        },
        components: {},
        ready: function () {

        }
    }
</script>