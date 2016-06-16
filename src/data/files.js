module.exports = [
    {
        name: "Safari",
        app: "browser",
        icon: "safari",
        options: {
            data: {
                index: "http://baidu.com"
            },
            height: function () {
                return window._h * 0.8;
            },
            width: function () {
                return window._w * 0.8;
            }
        }
    },
    {
        name: "Chrome",
        app: "browser",
        icon: "chrome",
        options: function () {
            return {
                data: {
                    index: "http://v2ex.com"
                },
                height: window._h * 0.8,
                width: window._w * 0.8
            }
        }
    },
    {
        name: "Firefox",
        app: "browser",
        icon: "firefox",
        options: {
            data: {
                index: "http://qq.com"
            },
            singleton: true
            // resizable:false
        }
    },
    {
        name: "计算器",
        app: "calculator",
        icon: "",
        options: {
            // resizable:false,
            width:400,
            height:400,
        }
    },
    {
        name: "自定义App",
        app: "custom-app",
        icon: "",
        options: {}
    }
];
