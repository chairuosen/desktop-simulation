var Vue = require('vue');
var jQuery = require('jquery');
window.$ = jQuery;
window.jQuery = jQuery;
window.Vue = Vue;
window.$event = require('service/event');
new Vue(require('views/root.vue'));
