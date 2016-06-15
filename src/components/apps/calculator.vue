<style lang="less" rel="stylesheet/less" scoped>
    @import "../../global";
    .container{
         color:#333;
    }
    .screen{
        height:20%;
        width:75%;
    }
    .fr{
        float:right;
    }
    .fl{
        float:left;
    }
    .buttons{
        overflow: hidden;
    }
    .button{
        text-align:center;
        border:1px solid #eee;
        &:active{
            background:#eee;
        }
        &.f{
            background:@blue;
            border:none;
            color:#fff;
            &:active{
                background:darken(@blue,5%);
            }
        }
    }
</style>
<template>
<div>
    <div class="container" :style="containerStyle();">
        <div class="button f fr" :style="buttonStyle();" @click="clear();">clear</div>
        <div class="screen" :style="screenStyle();">
            <span class="fr">{{computeSymbol[0]}}</span>
            {{currentValue}}
        </div>
        <div class="buttons">
            <div class="button fl" :class="{f:b[1]}" v-for="b in buttons" :style="buttonStyle();" @click="click(b)">{{b[0]||b}}</div>
        </div>
    </div>
</div>
</template>

<script>
    var symbol = {
        ADD:"ADD",
        SUB:"SUB",
        MUL:"MUL",
        DIV:"DIV",
        EQU:"EQU"
    };

    var computer = {};
    computer[symbol.ADD] = function (a,b) {
        var scale = Math.pow(10,getScale(a,b));
        return ( Number(a)*scale + Number(b)*scale ) / scale;
    };
    computer[symbol.SUB] = function (a,b) {
        var scale = Math.pow(10,getScale(a,b));
        return ( Number(a)*scale - Number(b)*scale ) / scale;
    };
    computer[symbol.MUL] = function (a,b) {
        var scale = Math.pow(10,getScale(a,b));
        return ( (Number(a)*scale)*(Number(b)*scale) ) / (scale*scale)
    };
    computer[symbol.DIV] = function (a,b) {
        var scale = Math.pow(10,getScale(a,b));
        return ( Number(a)*scale )/( Number(b)*scale )
    };

    function getScale(a,b){
        function getDecLength(a){
            return (a.toString().split('.')[1]||"").length;
        }
        return Math.max(
                getDecLength(a),
                getDecLength(b)
        );
    }

    function isNumber(key){
        return [1,2,3,4,5,6,7,8,9,0,'.'].indexOf(key)!==-1;
    }

    var initObject = {
        currentValue:"",
        lastValue:"",
        clearInNextAction:false,
        computeSymbol:""
    };

    module.exports = {
        props:{
            app:Object
        },
        data: function () {
            return $.extend({
                buttons:[
                    1,2,3,['÷',symbol.DIV],
                    4,5,6,['x',symbol.MUL],
                    7,8,9,['-',symbol.SUB],
                    0,'.',["=",symbol.EQU],["+",symbol.ADD]
                ]
            },initObject);
        },
        methods: {
            clear:function () {
                $.extend(this.$data,initObject);
            },
            containerStyle:function () {
                return {
                    width:this.app.width+'px',
                    height:this.app.height+'px'
                }
            },
            screenStyle:function () {
                return {
                    fontSize:(this.app.height/5) * 0.5+'px',
                    lineHeight:this.app.height/5+'px',
                    height:this.app.height/5+'px'
                }
            },
            buttonStyle:function () {
                return {
                    fontSize:(this.app.height/5) * 0.4+'px',
                    width:this.app.width/4+'px',
                    lineHeight:this.app.height/5+'px',
                    height:this.app.height/5+'px'
                }
            },
            click:function (key) {
                if( isNumber(key) ){
                    if(this.clearInNextAction){
                        this.clearInNextAction = false;
                        this.currentValue = "";
                    }

                    if(this.currentValue.length<10){
                        this.currentValue += key.toString();
                    }

                }else if(key[1] === symbol.EQU){
                    if(this.computeSymbol){
                        var action = this.computeSymbol[1];
                        if(this.lastValue!=="" && this.currentValue!==""){
                            this.currentValue = computer[action](this.lastValue,this.currentValue);
                        }
                    }
                    this.computeSymbol = "";
                    this.clearInNextAction = true;
                }else{
                    if(this.computeSymbol){
                        var action = this.computeSymbol[1];
                        if(this.lastValue!=="" && this.currentValue!==""){
                            this.currentValue = computer[action](this.lastValue,this.currentValue);
                            this.lastValue = this.currentValue;
                        }
                    }else{
                        this.lastValue = this.currentValue;
                    }

                    this.computeSymbol = key;
                    this.clearInNextAction = true;

                }
            }
        },
        components: {},
        ready: function () {

        }
    }
</script>