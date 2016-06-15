<style lang="less" rel="stylesheet/less">
    @import "../global";
    .app{
        background:#fff;
        border-radius:5px;
        overflow:hidden;
        box-shadow:0 10px 25px rgba(0, 0, 0, 0.4);
        @titleHeight:30px;
        &.animating{
            transition: all ease 0.5s;
        }
        .app-title{
            position:relative;
            background:#F2F6FF;
            text-align:center;
            line-height:@titleHeight;
            height:@titleHeight;
            cursor: default;
            color:#aaa;
            .Filter(saturate(0.5));
            .icon{
                position:absolute;
                top:4px;
                left:5px;

                /*display: inline-block;*/
                /*vertical-align: top;*/
                /*position:relative;*/
                /*top:5px;*/

                height:18px;
                width:18px;
                background-size:cover;

            }
        }
        &.focus{
            box-shadow:0 10px 35px rgba(0, 0, 0, 0.6);
            .app-title{
                background:#F5F8FF;
                color:#333;
                .Filter(saturate(1.2));
            }
        }
        .app-body{

        }
        .app-control{
            @margin:5px;
            position:absolute;
            right:0;
            top:0;
            height:@titleHeight;
            .c{
                display:block;
                position:relative;
                width:@titleHeight - 2*@margin;
                height:@titleHeight - 2*@margin;
                margin:@margin @margin 0 0;
                float:left;
                border-radius:3px;
            }
            .c1{
                background:#81C2D0;
                &:before{
                    box-sizing:border-box;
                    @w:12px;
                    @h:2px;
                    content:"";
                    display:block;
                    position:absolute;
                    height:@h;
                    width:@w;
                    left:  ( @titleHeight - 2*@margin - @w ) /2;
                    bottom: ( ( @titleHeight - 2*@margin - @h ) /2 ) - 4px;
                    background:#fff;
                }
            }
            .c2{
                background:#659A65;
                &:before{
                    box-sizing:border-box;
                    @w:12px;
                    @b:1px;
                    content:"";
                    display:block;
                    position:absolute;
                    height:@w;
                    width:@w;
                    left:  ( @titleHeight - 2*@margin - @w ) /2;
                    top: ( @titleHeight - 2*@margin - @w ) /2;
                    border:@b solid #fff;
                    border-top-width:2*@b;
                }
            }
            .Rotate(@deg){
                transform:rotate(@deg);
                -webkit-transform:rotate(@deg);
                -moz-transform:rotate(@deg);
            }
            .c3{
                &:before,&:after{
                    @w:14px;
                    @h:2px;
                    content:"";
                    display:block;
                    position:absolute;
                    height:@h;
                    width:@w;
                    left:  ( @titleHeight - 2*@margin - @w ) /2;
                    top: ( @titleHeight - 2*@margin - @h ) /2;
                    background:#fff;
                    .Rotate(45deg);
                }
                &:after{
                    .Rotate(-45deg);
                }
                background:#D26262;
            }
        }
        @reactionWidth:4px;
        .resize-handle{
            position:absolute;
            right:0;
            bottom:0;
        }
        .resize-overlay{
            position:absolute;
            top:0;
            left:0;
            height:100%;
            width:100%;
        }
        .resize-handle-right{
            height:100%;
            width:@reactionWidth;
            cursor: e-resize;
        }
        .resize-handle-bottom{
            width:100%;
            height:@reactionWidth;
            cursor: s-resize;
        }
        .resize-handle-both{
            width:@reactionWidth*2;
            height:@reactionWidth*2;
            cursor:se-resize;
        }
    }
</style>
<template>
    <div
            class="app"
            v-show="app._show"
            :class="{
                focus:app._focus,
                animating:app.animating
                }"
            :style="{
                width:app.width+'px',
                height:app.height+30+'px'
                }"

            @mousedown="appWindowMousedown(app,$event)"
    >
        <header
                class="app-title"
                @mousedown.self="titleMousedown(app,$event)"
                @mouseup="mouseup()"
        >
            <div class="icon {{app.icon}}">

            </div>
            {{app.title}}
            <div class="app-control">
                <span class="c c1" @mousedown="hideApp(app)"></span>
                <span class="c c2" v-show="app.resizable" @mousedown="app.resizable && maxApp(app)"></span>
                <span class="c c3" @mousedown="closeApp(app)"></span>
            </div>
        </header>
        <div class="app-body" :style="{height:app.height+'px'}">
            <component  :is="app.type" :app.sync="app"></component>
        </div>
        <div class="resize-overlay" v-show="drag || resize.bottom || resize.right || resize.both"></div>
        <div
                v-show="app.resizable"
                class="resize-handle resize-handle-right"
                @mousedown="resizeRightMousedown(app,$event)"
        ></div>
        <div
                v-show="app.resizable"
                class="resize-handle resize-handle-bottom"
                @mousedown="resizeBottomMousedown(app,$event)"
        ></div>
        <div
                v-show="app.resizable"
                class="resize-handle resize-handle-both"
                @mousedown="resizeBothMousedown(app,$event)"
        ></div>
    </div>
</template>
<script>
    var appWindowMinWidth = 400;
    var appWindowMinHeight = 200;


    module.exports = {
        props:{
            app:Object,
        },
        data: function () {
            return {
                drag:false,
                resize:{
                    right:false,
                    bottom:false,
                    both:false
                }
            }
        },
        methods: {
            appWindowMousedown:function (app,e) {
                if( !$(e.target).is('.app-control *') ){
                    app.show();
                }
            },
            titleMousedown:function (app,e) {
                app.show();
                this.drag = {x:e.clientX-app.left,y:e.clientY-app.top};
            },
            mouseup:function () {
                this.drag = false;
                this.resize.right = false;
                this.resize.bottom = false;
                this.resize.both = false;
            },
            resizeRightMousedown:function (app,e) {
                app.show();
                this.resize.right = {d:e.clientX-app.left-app.width};
            },
            resizeBottomMousedown:function (app,e) {
                app.show();
                this.resize.bottom = {d:e.clientY-app.top-app.height};
            },
            resizeBothMousedown:function (app,e) {
                app.show();
                this.resize.both = {
                    dy:e.clientY-app.top-app.height,
                    dx:e.clientX-app.left-app.width
                }
            },
            closeApp:function (app) {
                app.close();
            },
            maxApp:function (app) {
                app.maximize();
            },
            hideApp:function (app) {
                app.hide();
            }
        },
        components: {},
        ready: function () {
            var vm = this;
            var $w = $(window);

            $w.on('mousemove',function (e) {
                var app = vm.app;

                var height,width;
                if(vm.drag){
                    var y = e.clientY - vm.drag.y;
                    var x = e.clientX - vm.drag.x;
                    app.top = Math.min(Math.max(0,y),window._h-app.height);
                    app.left = Math.min(Math.max(0,x),window._w-app.width);
                }
                if(vm.resize.bottom){
                    height = e.clientY - vm.resize.bottom.d - app.top;
                }

                if(vm.resize.right){
                    width = e.clientX - vm.resize.right.d - app.left;
                }

                if(vm.resize.both){
                    height = e.clientY - vm.resize.both.dy - app.top;
                    width = e.clientX - vm.resize.both.dx - app.left;
                }

                if(height){
                    var maxHeight = window._h - app.top;
                    app.set('height',Math.max(Math.min(height,maxHeight),appWindowMinHeight));
                }
                if(width){
                    var maxWidth = window._w - app.left;
                    app.set('width',Math.max(Math.min(width,maxWidth),appWindowMinWidth));
                }

            }).on('mouseup',vm.mouseup);

        }
    }

    // auto load apps in `../components/apps/`
    var appRequire = require.context('../components/apps/', true, /\.vue$/);
    var appPathArr = appRequire.keys();
    appPathArr.forEach(function (appPath) {
        var appName = appPath.match(/\.\/([a-z\-_]*)\.vue$/)[1].replace(/-(\w)/,function(match,match1){
            return match1.toUpperCase();
        });
        module.exports.components[appName] = appRequire(appPath);
    });
</script>