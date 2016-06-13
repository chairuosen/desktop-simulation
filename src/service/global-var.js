var $w = $(window);
$w.on('resize',update);
update();
function update(){
    window._h = $w.height()-40; // taskbar
    window._w = $w.width();
}