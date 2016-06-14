
function change(){
    $.each(combination,function (k,v) {
        v.forEach(function (arr) {
            var flag = true;
            arr.forEach(function (code) {
                if(!keypressMap[code]){
                    flag = false;
                }
            });
            if(flag){
                $event.emit(k+':keyboard');
            }
        })
    })
}

function isA2Z(e){
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        return true;
    }
    return false;
}
var k = {
    'cmd':91,
    'ctrl':17,
    'c':67,
    'v':86,
    'x':88,
    'a':65
}
var combination = {
    "copy":[ [k.cmd,k.c], [k.ctrl,k.c] ],
    "paste":[ [k.cmd,k.v], [k.ctrl,k.v] ],
    "cut":[ [k.cmd,k.x], [k.ctrl,k.x] ],
    "selectAll":[ [k.cmd,k.a], [k.ctrl,k.a] ]
}

var keypressMap = [];
module.exports = {
    keypressMap:keypressMap,
    init:function () {
        $(window).off('keydown keyup').on('keydown',function (e) {
            keypressMap[e.keyCode] = true;
            change();
            if(isA2Z(e)){
                setTimeout(function () {
                    keypressMap[e.keyCode] = false;
                    change();
                },100)
            }
        }).on('keyup',function (e) {
            keypressMap[e.keyCode] = false;
            change();
        });
    },
    keyMap:k
};