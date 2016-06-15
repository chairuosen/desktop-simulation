<style lang="less" rel="stylesheet/less">
</style>
<template>
    <div class="application-section">
        <app-window
                v-for="app in apps"
                :app="app"
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