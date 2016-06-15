function File(o){
    $.extend(this,o);
    this.x = 0;
    this.y = 0;
    this.selected = false;
}
File.prototype.open = function () {
    var appController = require('service/app-controller');
    appController.openFile(this);
};
File.prototype.select = function () {
    this.selected = !this.selected;
};

File.prototype.clone = function () {
    var _this = this;
    var newObject = {};
    $.each(_this,function (k,v) {
        if(_this.hasOwnProperty(k)){
            newObject[k] = v;
        }
    });
    return new File(newObject);
};

module.exports = File;