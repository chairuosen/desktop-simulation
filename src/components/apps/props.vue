<style lang="less" rel="stylesheet/less" scoped>
    .icon{
        width:150px;
        height:150px;
        background-size:cover;
        margin:20px auto;
    }
    h1{
        color:#666;
        text-align:center;
        font-size:40px;
        margin-bottom:20px;
    }
    p{
        text-align: center;
    }
    main{
        display:block;
        width:70%;
        margin:0 auto;
    }
</style>
<template>
    <div :style="{height:app.height+'px',width:app.width+'px'}">
        <div class="icon {{openedFile.icon}}"></div>
        <h1>{{openedFile.name}}</h1>
        <p>目标: <input type="text" disabled value="{{openedFile.app}}"></p>
        <main>
            <pre>{{ openedFile.options.data | json }}</pre>
        </main>
    </div>
</template>

<script>
    var a = {
        "name": "Chrome",
        "app": "browser",
        "icon": "chrome",
        "options": {
            "data": {
                "index": "http://v2ex.com"
            },
            "height": 1022.4000000000001,
            "width": 1373.6000000000001
        }
    };

    module.exports = {
        props:{
            app:true
        },
        data: function () {
            return {}
        },
        computed:{
            openedFile:function () {
                var file = this.app.data;
                return $.extend(file._sourceData,{options:file.getOptions()});
            }
        },
        methods: {},
        components: {},
        ready: function () {

        }
    }
</script>