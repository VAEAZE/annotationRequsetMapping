/*from tccdn minify at 2016-8-6 21:37:14,file：/cn/s/touch/2015/zt/bcf_rem/remRootCtrl.2.js,file：/cn/s/touch/2016/c/resetRefID.3.2.js,file：/cn/s/2016/touch/zt/c/SetShareFun.4.3.js,file：/touch/app/pub/public/getClientInfo.2.0.1.js,file：/cn/s/2016/touch/zt/c/sztcom.js,file：/touch/hb/c/webp/webpjs.min.js,file：/touch/public/location/0.0.2/location.js,file：/cn/s/2016/touch/zt/38461/newRefid.js?v=2016012702*/
var remRoot={parameter:{globalFontSize:0,a:document.documentElement,timer:null,winSize:0},setBodyFontSize:function(){var a=document.getElementsByTagName("body")[0];var d=a.getAttribute("style")||"";if(d.indexOf("font-size")!==-1){}else{if(d.substr(-1)==";"){a.setAttribute("style",d+"font-size:.18rem;")}else{a.setAttribute("style",d+";font-size:.18rem;")}}},setRootFontSize:function(b){var a=(b/640)*100;a=a>100?a=100:a;a=a<50?a=50:a;remRoot.parameter.a.style.fontSize=a+"px";remRoot.parameter.globalFontSize=a},initialize:function(){if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);remRoot.parameter.winSize=remRoot.parameter.a.offsetWidth||remRoot.parameter.a.clientWidth||remRoot.parameter.a.scrollWidth;remRoot.setRootFontSize(remRoot.parameter.winSize);remRoot.setBodyFontSize()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState=="complete"){document.detachEvent("onreadystatechange",arguments.callee);remRoot.parameter.winSize=remRoot.parameter.a.offsetWidth||remRoot.parameter.a.clientWidth||remRoot.parameter.a.scrollWidth;remRoot.setRootFontSize(remRoot.parameter.winSize);remRoot.setBodyFontSize()}})}}window.onresize=function(){clearTimeout(remRoot.parameter.timer);remRoot.parameter.timer=setTimeout(function(){remRoot.parameter.winSize=remRoot.parameter.a.offsetWidth||remRoot.parameter.a.clientWidth||remRoot.parameter.a.scrollWidth;remRoot.setRootFontSize(remRoot.parameter.winSize)},500)}}};remRoot.initialize();












