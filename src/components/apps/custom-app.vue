<style lang="less" rel="stylesheet/less">
    .custom-h1{
        color:red;
    }
</style>
<template>
    <div>
        <h1 class="custom-h1">
            Hello World!
        </h1>
    </div>
</template>

<script>
    module.exports = {
        props:{
            app:true
        },
        data: function () {
            return {}
        },
        methods: {},
        components: {},
        ready: function () {

        }
    }
</script>