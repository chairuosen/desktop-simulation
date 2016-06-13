module.exports = {
    clone:function clone(a) {
        return JSON.parse(JSON.stringify(a));
    }
}