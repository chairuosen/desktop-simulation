<style lang="less" rel="stylesheet/less">
    @import "../global";
    .app{
        position:absolute;
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
        &.maximized{
            .app-control .c.c2{
                @margin:5px;
                @diff:2px;
                @w:8px;
                @b:1px;
                @top:0px;
                @left:0px;
                &:before{
                    box-sizing:border-box;
                    content:"";
                    display:block;
                    position:absolute;
                    height:@w;
                    width:@w;
                    left:  ( @titleHeight - 2*@margin - @w ) /2 - @diff + @left;
                    top: ( @titleHeight - 2*@margin - @w ) /2 + @diff + @top;
                    border:@b solid #fff;
                    border-top-width:2*@b;
                }
                &:after{
                    box-sizing:border-box;
                    content:"";
                    display:block;
                    position:absolute;
                    height:@w;
                    width:@w;
                    left:  ( @titleHeight - 2*@margin - @w ) /2  + @diff + @left;
                    top: ( @titleHeight - 2*@margin - @w ) /2  - @diff + @top;
                    border:@b solid #fff;
                    border-top-width:2*@b;
                }
            }
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
        }
        .resize-overlay{
            position:absolute;
            top:0;
            left:0;
            height:100%;
            width:100%;
        }
        .resize-handle-r{
            right:0;
            bottom:0;
            height:100%;
            width:@reactionWidth;
            cursor: e-resize;
        }
        .resize-handle-b{
            right:0;
            bottom:0;
            width:100%;
            height:@reactionWidth;
            cursor: s-resize;
        }
        .resize-handle-l{
            left:0;
            top:0;
            height:100%;
            width:@reactionWidth;
            cursor: w-resize;
        }
        .resize-handle-t{
            left:0;
            top:0;
            width:100%;
            height:@reactionWidth;
            cursor: n-resize;
        }
        .resize-handle-br{
            right:0;
            bottom:0;
            width:@reactionWidth*2;
            height:@reactionWidth*2;
            cursor:se-resize;
        }
        .resize-handle-bl{
            left:0;
            bottom:0;
            width:@reactionWidth*2;
            height:@reactionWidth*2;
            cursor:sw-resize;
        }
        .resize-handle-tr{
            top:0;
            right:0;
            width:@reactionWidth*2;
            height:@reactionWidth*2;
            cursor:ne-resize;
        }
        .resize-handle-tl{
            top:0;
            left:0;
            width:@reactionWidth*2;
            height:@reactionWidth*2;
            cursor:nw-resize;
        }
    }
</style>
<template>
    <div
            class="app"
            v-show="app._show"
            :class="{
                focus:app._focus,
                animating:app.animating,
                maximized:app.maximized
                }"
            :style="{
                top:app.top+'px',
                left:app.left+'px',
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
        <div class="resize-overlay" v-show="overlayShow"></div>
        <div
                v-for="dir in resizeDirection"
                v-show="app.resizable"
                class="resize-handle resize-handle-{{dir}}"
                @mousedown="resizeHandler(dir,$event)"
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
                    r:false,
                    b:false,
                    t:false,
                    l:false
                },
                overlayShow:false,
                resizeDirection:['t','b','l','r','tl','tr','bl','br']
            }
        },
        computed:{
            isResizing:function () {
                var resizing = false;
                $.each(this.resize,function (k,v) {
                    if(v){
                        resizing = true;
                    }
                })
                return resizing;
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
                var vm = this;
                $.each(this.resize,function (k,v) {
                    vm.resize[k] = false;
                });
            },
            closeApp:function (app) {
                app.close();
            },
            maxApp:function (app) {
                app.maximize();
            },
            hideApp:function (app) {
                app.hide();
            },
            resizeHandler:function (direction,event) {
                var vm = this;
                var app = vm.app;
                app.show();
                var fn = {
                    r:function (e) {
                        vm.resize.r = {d:e.clientX-app.left-app.width};
                    },
                    b:function (e) {
                        vm.resize.b = {d:e.clientY-app.top-app.height};
                    },
                    l:function (e) {
                        vm.resize.l = {
                            d:e.clientX - app.left,      // distance of click and edge
                            right:app.left+app.width
                        };
                    },
                    t:function (e) {
                        vm.resize.t ={
                            d:e.clientY - app.top,
                            bottom:app.top + app.height
                        }
                    },
                };
                var arr = direction.split('');
                arr.forEach(function(dir){
                    if(fn[dir]){
                        fn[dir](event)
                    }
                })
            }
        },
        components: {},
        ready: function () {
            var vm = this;
            var $w = $(window);
            var app = vm.app;

            function isset(n){
                return typeof n !=='undefined';
            }

            function onDrag(e){
                var y = e.clientY - vm.drag.y;
                var x = e.clientX - vm.drag.x;
                app.top = Math.min(Math.max(0,y),window._h-app.height-app.titleHeight);
                app.left = Math.min(Math.max(0,x),window._w-app.width);
            }

            function onEasyResize(e){
                var height,width;

                if(vm.resize.b){
                    height = e.clientY - vm.resize.b.d - app.top;
                }

                if(vm.resize.r){
                    width = e.clientX - vm.resize.r.d - app.left;
                }

                if(height){
                    var maxHeight = window._h - app.top - app.titleHeight;
                    height = Math.max(Math.min(height,maxHeight),appWindowMinHeight);
                    app.set('height',height);
                }
                if(width){
                    var maxWidth = window._w - app.left;
                    width = Math.max(Math.min(width,maxWidth),appWindowMinWidth);
                    app.set('width',width);
                }
            }

            function onDamnItResize(e){
                var height,width,top,left,right,bottom;

                if(vm.resize.l){
                    right = vm.resize.l.right;
                    left = e.clientX - vm.resize.l.d;
                    left = Math.max(left,0);
                }
                if(vm.resize.t){
                    bottom = vm.resize.t.bottom;
                    top = e.clientY - vm.resize.t.d;
                    top = Math.max(top,0);
                }


                if(right && isset(left)){
                    width = right - left;
                    if(width<appWindowMinWidth){
                        width = appWindowMinWidth;
                        left = right - width;
                    }
                }

                if(isset(top) && bottom){
                    height = bottom - top;
                    if(height < appWindowMinHeight){
                        height = appWindowMinHeight;
                        top = bottom - height;
                    }
                }

                if(isset(left)){
                    app.set('left',left);
                }
                if(isset(top)){
                    app.set('top',top);
                }

                if(height){
                    app.set('height',height);
                }
                if(width){
                    app.set('width',width);
                }
            }

            $w.on('mousemove',function (e) {

                if(vm.drag){
                    onDrag(e);
                }else if(vm.isResizing){
                    onEasyResize(e);
                    onDamnItResize(e);
                }

            }).on('mouseup',vm.mouseup);
            
            vm.$watch(function () {
                return vm.drag || vm.isResizing;
            },function (val) {
                $event.emit('overlay:show',val);
            });
            $event.on('overlay:show',function (val) {
                vm.overlayShow = val;
            });

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