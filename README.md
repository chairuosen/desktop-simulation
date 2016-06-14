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
 
 Add app code to `src/components/apps/`, and app icon to `src/data/files.js`.
 
 App Class:
 
 ```
 show: true, 
 title: "app",
 icon:"",
 actived: false,           // on the top of others
 type: null,                // app component's name
 top: 100 + count * 2,
 left: 100 + count * 2,
 height: window._h*0.8,
 width: window._w*0.8,
 data:null,                 // app custom data
 animating:false,
 maximized: false,
 oldPosition: null,        // maximized need
 resizable:true,           // if user can resize the app window
 singleton:false,          // only one instance
 closed:false               
 ```
 
 File example:
 
 ```
 {
     name:"Firefox",
     app:"browser", // app component's name
     icon:"firefox", // defined in css .icon
     options:{      // options will be extended to App Class's instance
         data:{  
             index:"http://qq.com" 
         },
         singleton:true
         // resizable:false
     }
 }, 
 ```