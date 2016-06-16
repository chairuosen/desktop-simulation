function File(o){
    $.extend(this,o);
    if(!this.x){
        this.x = 0;
    }
    if(!this.y){
        this.y = 0;
    }
    if(!this.inPosition){
        this.inPosition = false;
    }
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