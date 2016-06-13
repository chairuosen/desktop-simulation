<style lang="less" rel="stylesheet/less">
    .app{
        position:absolute;
        background:#fff;
        min-width:400px;
        border-radius:5px;
        overflow:hidden;
        .app-title{
            background:#ddd;
            text-align:center;
            line-height:30px;
        }
        .app-body{

        }
    }
</style>
<template>
    <div class="application-section">
        <div
                v-for="app in apps"
                class="app"
                :style="{
                top:app.top+'px',
                left:app.left+'px',
                width:app.width+'px',
                height:app.height+'px'
                }"
        >
            <header class="app-title"
                @mousedown="mousedown(app)"
            >
                {{app.title}}
            </header>
            <div class="app-body">
                <component  :is="app.type"></component>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                apps:[
                    {
                        title:"Safari",
                        type:'browser',
                        top:200,
                        left:200,
                        height:400,
                        width:400
                    }
                ],
                current:null
            }
        },
        methods: {
            mousedown:function () {
                //todo
            }
        },
        components: {
            browser:require('components/browser.vue')
        },
        ready: function () {

        }
    }
</script>