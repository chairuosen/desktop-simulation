<style lang="less" rel="stylesheet/less">
    .app-browser{
        position:relative;
        height:100%;
    }
    @headerHeight:30px;
    .browser-header{
        height:@headerHeight;
        background:#F3F3F3;
        position:absolute;
        top:0;
        left:0;
        width:100%;
        .browser-control-panel{
            &>div{
                float:left;
                display:block;
                height: @headerHeight;
                width:@headerHeight;
                text-align:center;
                cursor: default;
                &:hover{
                    background:#fff;
                }
                &:active{
                    background:#eee;
                }
            }
            float:left;
        }
        .browser-address-bar{
            position:relative;
            margin-left:3*@headerHeight + 20px;
            @margin:4px;
            .browser-address-input{
                width:100%;
                vertical-align: top;
                height:@headerHeight - 2*@margin;
                position:relative;
                top:@margin;
                &:focus{
                    outline:none;
                }
            }
            .browser-address-input-container{
                margin-right:50px;
            }
            .browser-address-button{
                position:absolute;
                right:0;
                width:50px;
                cursor: default;
                text-align:center;
                top:@margin;
                line-height:@headerHeight - 2*@margin;
                background: #E8E8E8;
                color: #999;
                &:hover{
                    background:#eee;
                }
                &:active{
                    background:#ccc;
                }
            }
        }
    }
    .browser-body{
        padding-top:30px;
    }
</style>
<template>
    <div class="app-browser">
        <header class="browser-header">
            <div class="browser-control-panel">
                <div class="back" @click="iframeBack();"> < </div>
                <div class="forward" @click="iframeForward();"> > </div>
                <div class="refresh" @click="iframeReload();"> c </div>
            </div>
            <div class="browser-address-bar">
                <div class="browser-address-input-container">
                    <input
                            class="browser-address-input"
                            @blur="fixUrl();"
                            @keyup.enter="(fixUrl()||true)&&go();"
                            v-model="url"
                            type="text"
                    >
                </div>
                <div class="browser-address-button" @click="go();">Go</div>
            </div>
        </header>
        <section class="browser-body" :style="{height: app.height + 'px'}">
            <iframe v-el:iframe :src="src" name="test" height="100%" width="100%" frameborder="0"></iframe>
        </section>
    </div>
</template>

<script>
    module.exports = {
        props:{
            app:true
        },
        data: function () {
            return {
                url:"",
                history:[],
                currentHistoryIndex:-1,
                src:""
            }
        },
        methods: {
            fixUrl:function () {
                if( !$.trim(this.url) ){
                    return;
                }
                if(!/^http[s]?:\/\//.test(this.url)){
                    this.url = "http://"+this.url
                }
            },
            go:function () {
                if(!$.trim(this.url))return;
                this.iframeGo(this.url);
            },
            iframeGo:function (url) {
                this.src = url;
            },
            iframeBack:function () {
                this.$els.iframe.contentWindow.history.go(-1);
            },
            iframeForward:function () {
                this.$els.iframe.contentWindow.history.go(1);
            },
            iframeReload:function () {
                this.$els.iframe.contentWindow.location.reload();
            }
        },
        components: {},
        ready: function () {
            if(this.app.data){
                this.url = this.app.data.index;
                this.fixUrl();
                this.go();
            }
        }
    }
</script>