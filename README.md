Desktop-simulation
======================

Demo: http://demo.ruosen.io/desktop-simulation/

## Init
 
 ```
 npm install
 ```
 
## build
 
 ```
 npm run build
 ```
 
## dev
 
 ```
 npm run dev
 ```
 
## Add Custom Apps
 
 Write app component code in `src/components/apps/`, and add desktop icon data to `src/data/files.js`.
 
 <!--App Class:-->
 <!---->
 <!--```-->
 <!--_show: true, -->
 <!--title: "app",-->
 <!--icon:"",-->
 <!--_focus: false,           // on the top of others-->
 <!--type: null,                // app component's name-->
 <!--top: 100 + count * 2,-->
 <!--left: 100 + count * 2,-->
 <!--height: window._h*0.8,-->
 <!--width: window._w*0.8,-->
 <!--data:null,                 // app custom data-->
 <!--animating:false,-->
 <!--maximized: false,-->
 <!--oldPosition: null,        // maximized need-->
 <!--resizable:true,           // if user can resize the app window-->
 <!--singleton:false,          // only one instance-->
 <!--_close:false                -->
 <!--```-->
 
 Component (*.vue) example:
 
 ```
 <style lang="less" rel="stylesheet/less">
     .custom-h1{
         color:red;
     }
 </style>
 <template>
     <div>
         <h1 class="custom-h1">
             Hello World!
         </h1>
     </div>
 </template>
 
 <script>
     module.exports = {
         props:{
             app:true
         },
         data: function () {
             return {}
         },
         methods: {},
         components: {},
         ready: function () {
 
         }
     }
 </script>
 ```
 
 Icon data example:
 
 ```
 {
     name:"Firefox",
     app:"browser", // app component's file name
     icon:"firefox", // defined in css .icon
     options:{      // options will be extended to App Class's instance , it can be a function that returns options object
         data:{  
             index:"http://qq.com" 
         },
         singleton:true,
         width: function () {  // value can be a function that returns dynamic value; 
             return $(window).width() * 0.8;
         }
     }
 }
 ```