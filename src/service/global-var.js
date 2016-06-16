var $w = $(window);
$w.on('resize',update);

window._h = $w.height()-40;
window._w = $w.width();

function update(){
    window._h = $w.height()-40; // taskbar
    window._w = $w.width();
    $event && $event.emit('window:resize');
}