var $w = $(window);
window._h = $w.height();
window._w = $w.width();
$w.on('resize',function () {
    window._h = $w.height();
    window._w = $w.width();
})