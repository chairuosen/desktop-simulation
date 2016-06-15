<style lang="less" rel="stylesheet/less">
    .application-instance{
        position:absolute;
    }
</style>
<template>
    <div class="application-section">
        <app-window
                v-for="app in apps"
                class="application-instance"
                :app="app"
                :style="{
                top:app.top+'px',
                left:app.left+'px'
                }"
        ></app-window>
    </div>
</template>

<script>
    module.exports = {
        props:{
            apps:Array
        },
        data: function () {
            return {
            }
        },
        methods: {
        },
        components: {
            appWindow:require('components/app-window.vue')
        },
        ready: function () {
        }
    };
</script>