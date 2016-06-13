<style lang="less" rel="stylesheet/less">
    .app{
        position:absolute;
        background:#fff;
        border-radius:5px;
        overflow:hidden;
        box-shadow:0 5px 35px rgba(0, 0, 0, 0.4);
        .app-title{
            background:#ddd;
            text-align:center;
            line-height:30px;
            cursor: default;
        }
        .app-body{

        }
        @reactionWidth:4px;
        .resize-handle{
            position:absolute;
            right:0;
            bottom:0;
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
            <header
                    class="app-title"
                    @mousedown="titleMousedown(app,$event)"
                    @mouseup="mouseup()"
            >
                {{app.title}}
            </header>
            <div class="app-body">
                <component  :is="app.type"></component>
            </div>
            <div
                    class="resize-handle resize-handle-right"
                    @mousedown="resizeRightMousedown(app,$event)"
            ></div>
            <div
                    class="resize-handle resize-handle-bottom"
                    @mousedown="resizeBottomMousedown(app,$event)"
            ></div>
            <div
                    class="resize-handle resize-handle-both"
                    @mousedown="resizeBothMousedown(app,$event)"
            ></div>
        </div>
    </div>
</template>

<script>
    var appWindowMinWidth = 400;
    var appWindowMinHeight = 200;
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
                    },
                    {
                        title:"Safari",
                        type:'browser',
                        top:200,
                        left:200,
                        height:400,
                        width:400
                    }
                ],
                current:{
                    app:null,
                    drag:false,
                    resize:{
                        right:false,
                        bottom:false
                    }
                },

            }
        },
        methods: {
            switchApp:function (app) {
                this.current.app = app;
                var otherApps = this.apps.filter(function (a) {
                    return a!==app;
                });
                otherApps.push(app);
                this.apps = otherApps;
            },
            titleMousedown:function (app,e) {
                this.switchApp(app);
                this.current.drag = {x:e.clientX-app.left,y:e.clientY-app.top};
            },
            mouseup:function () {
                this.current.drag = false;
                this.current.resize.right = false;
                this.current.resize.bottom = false;
                this.current.resize.both = false;
            },
            resizeRightMousedown:function (app,e) {
                this.switchApp(app);
                this.current.resize.right = {d:e.clientX-app.left-app.width};
            },
            resizeBottomMousedown:function (app,e) {
                this.switchApp(app);
                this.current.resize.bottom = {d:e.clientY-app.top-app.height};
            },
            resizeBothMousedown:function (app,e) {
                this.switchApp(app);
                this.current.resize.both = {
                    dy:e.clientY-app.top-app.height,
                    dx:e.clientX-app.left-app.width
                }
            }
        },
        components: {
            browser:require('components/browser.vue')
        },
        ready: function () {
            var vm = this;
            var $w = $(window);
            var outside = false;
            $w.on('mousemove',function (e) {
                var app = vm.current.app;

                if(vm.current.drag){
//                    if(outside){
//                        vm.current.drag = false;
//                        outside = false;
//                        return;
//                    }
                    var y = e.clientY - vm.current.drag.y;
                    var x = e.clientX - vm.current.drag.x;
                    app.top = Math.min(Math.max(0,y),window._h-app.height);
                    app.left = Math.min(Math.max(0,x),window._w-app.width);
                }
                if(vm.current.resize.bottom){
                    if(outside){
                        vm.current.resize.bottom = false;
                        outside = false;
                        return;
                    }
                    var height = e.clientY - vm.current.resize.bottom.d - app.top;
                    app.height = Math.max(Math.min(height,window._h),appWindowMinHeight);
                }

                if(vm.current.resize.right){
                    if(outside){
                        vm.current.resize.right = false;
                        outside = false;
                        return;
                    }
                    var width = e.clientX - vm.current.resize.right.d - app.left;
                    app.width = Math.max(Math.min(width,window._w),appWindowMinWidth);
                }

                if(vm.current.resize.both){
                    if(outside){
                        vm.current.resize.both = false;
                        outside = false;
                        return;
                    }
                    var height = e.clientY - vm.current.resize.both.dy - app.top;
                    var width = e.clientX - vm.current.resize.both.dx - app.left;
                    app.height = Math.max(Math.min(height,window._h),appWindowMinHeight);
                    app.width =  Math.max(Math.min(width,window._w),appWindowMinWidth);
                }

                if(e.clientY>window._h || e.clientX > window._w || e.clientY<0 || e.clientX <0){
                    outside = true;
                }else{
                    outside = false;
                }
            }).on('mouseup',vm.mouseup);
        }
    }
</script>