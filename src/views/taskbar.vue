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
            width:100px;
            text-align:center;
            line-height:@h;
            background:#666;
            margin-right:2px;
            &.actived{
                background:#999;
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
                {{app.title}}
            </div>
        </div>
    </div>
</template>
<script>
    var util = require('service/util');

    function getNewArray(arr) {
        var _arr=[];
        arr.forEach(function (a) {
            _arr.push(a);
        });
        return _arr;
    }

    module.exports = {
        props:{
            apps:true
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
                this.$dispatch('switchApp',app);
            }
        },
        components: {},
        ready: function () {

        }
    }
</script>