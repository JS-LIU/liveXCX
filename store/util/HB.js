/**
 * Created by 殿麒 on 2016/6/28.
 */

/**
 *  HB.obj
 *      HB.obj.toEquals
 *      HB.obj.isEmpty
 *  HB.resource
 *      HB.resource.query()
 *      HB.resource.save()
 *  HB.valid
 *      HB.valid.toPhoneNum
 *  HB.ui
 *      HB.ui.scrollToTheBottom
 *  HB.url
 *      HB.url.getBaseUrl
 *      HB.url.getKey
 *      HB.url.history
 *  HB.save
 *      HB.save.storage
 *  HB.CSS3
 *  HB.slide
 *      HB.slide.left
 *  HB.design
 *      HB.design.chain
 */
export let HB = HB || {};

HB.obj = (function(){

    //  判断obj1中是否有obj2中的所有属性
    const toEquals = function (obj1, obj2) {
        let flag = true;
        for (const prop in obj2) {

            if (obj1[prop] !== obj2[prop]) {
                flag = false;
                break;
            }
        }
        return flag;

    };

    //  用途：是否为空对象
    const isEmpty = function (obj) {
        const arr = Object.keys(data);
        return arr.length === 0;
    };
    let isArray = function isArray(o) {
        return Object.prototype.toString.call(o) === "[object Array]";
    };
  //  判断是否为"",null,{} 如果是返回true,否则返回false
  const isNothing = function (arg) {

    if (arg === null) {
      return true;
    }
    if (arg === "") {
      return true;
    }
    if (arg === undefined) {
      return true
    }
    if (Object.prototype.toString.call(arg) === "[object Object]" && isEmpty(arg)) {
      return true;
    }
  };
    return {
        toEquals:toEquals,
        isEmpty:isEmpty,
        isArray:isArray,
        isNothing: isNothing
    }

})();
Function.prototype.after = function (fn) {
  let self = this;
  return function () {
    let ret = self.apply(this, arguments);
    if (ret === "nextSuccessor") {
      return fn.apply(this, arguments);
    }
    return ret;
  }
};
Function.prototype.before = function (beforefn) {
  let __self = this;
  return function () {
    beforefn.apply(this, arguments);
    return __self.apply(this, arguments);
  }
};

HB.ajax = (function () {

  let wxRequest = function (requestInfo, context) {
    let header = {};
    if (requestInfo.header){
      header[requestInfo.header.name] = requestInfo.header.value;
    }
    wx.request({
      url: requestInfo.url,
      data: requestInfo.data,
      method: requestInfo.method,
      header: header,
      success: (data) => {
        requestInfo.resolve(data.data);
        
      }

    })
  }.before((requestInfo, context) => {
    context.config(requestInfo);
  });
  let config = function (configObj = {}) {
    this.config = function (requestInfo) {
      requestInfo.url = configObj.baseUrl + requestInfo.url;
    };
    return this.config;

  };
  class UrlCreator {
    constructor(templateUrl) {
      this.templateUrl = templateUrl + "/";
    }
    getUrl(replaceUrlObj) {
      let url = this.templateUrl;
      for (let p in replaceUrlObj) {
        url = url.replace("/:" + p + "/", "/" + replaceUrlObj[p] + "/");
      }
      return url.substr(0, url.length - 1);
    }
  }

  class Resource {
    constructor(url, that) {
      this.urlCreator = new UrlCreator(url);
      this.that = that;
    }
    query() { }
    save(replaceUrlObj, data,header) {
      let url = this.urlCreator.getUrl(replaceUrlObj);
      let method = "POST";
      return new Promise((resolve, reject) => {
        wxRequest({ resolve, reject, method, url, data, header }, this.that);
      })
    }
  }

  return {
    config: config,
    resource: function (url) {
      let that = this;
      return new Resource(url, that);
    }
  }
})();

HB.valid = (function(){
    /*
    *   用途：按一定规则分割字符串
    *   第1个参数是分割哪个字符串 比如：18801233565
    *   第2个参数是每隔多少个字符分割 比如：18801233565 分成 188 0123 3565 就传[3,4,4]
    *   第3个参数是用什么来分割 比如：18801233565 分成 188-0123-3565 就传'-'
    * */

    function validNum(num,arr,str){
        let myNum = num.split(str).join("");
        let newPhoneNum = [];
        for(let i = 0;i < arr.length;i++){
            let newNum = myNum.slice(0,arr[i]);
            newPhoneNum.push(newNum);
            myNum = myNum.substr(arr[i]);
        }
        return newPhoneNum.join(str).trim();
    }
    function validPhoneNum(phoneNum){
        return phoneNum.length === 11;
    }


    //  用途：将字符串中所有空格删除
    function trimAllBlank(str){
        return str.replace(/\s/g, "");
    }

    //  用途：将数字转换成字符串
    function parseString(i){
        return i+"";
    }

    //  用途：将字符串转换为数组
    function parseArr(str){
        return str.split('');
    }

    //  用途：将阿拉伯数子转换为汉字
    function parseChinese(number){
        let chinese = ['零','一','二','三','四','五','六','日','八','九'];
        let arrNumber = parseArr(parseString(number));
        let chineseNumber = "";

        return arrNumber.map((item,index)=>{
            chineseNumber += chinese[item];
            return chineseNumber;
        });
    }

    //  将星期几转换成汉字的
    function parseDay(day){
        let myDay = day;
        if(day === 0){
            myDay = 7;
        }
        return parseChinese(myDay);

    }
    function addTimeToDay(day,time,format){
        if(checkFormatTime(format,day)){
            return day + time;
        }
        return null;
    }
    //  todo 临时校验 改为正则校验规则
    function checkFormatTime(format,day){
        return day.length === 10;
    }
  function isPoneAvailable(phoneNum) {
    let myReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myReg.test(phoneNum)) {
      return false;
    } else {
      return true;
    }
  }
    return {
        validNum:validNum,
        trimAllBlank:trimAllBlank,
        parseString:parseString,
        parseArr:parseArr,
        parseChinese:parseChinese,
        parseDay:parseDay,
        validPhoneNum:validPhoneNum,
        addTimeToDay:addTimeToDay,
      isPoneAvailable: isPoneAvailable
    }

})();

HB.ui = (function(){
    //  是否移动到底部
    // var scrollToTheBottom = function(func){
    //     $(window).bind("scroll",function(){
    //         var $_scrollTop = $(this).scrollTop();
    //         var $_scrollHeight = $(document).height();
    //         var $_windowHeight = $(this).height();
    //         if($_scrollTop + $_windowHeight === $_scrollHeight){
    //             func();
    //         }
    //     });
    // };
    //  滚动条在Y轴上的滚动距离
    let getScrollTop = function(){
        let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if(document.body){
            bodyScrollTop = document.body.scrollTop;
        }
        if(document.documentElement){
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    };

    //  文档的总高度
    let getScrollHeight = function(){
        let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
            bodyScrollHeight = document.body.scrollHeight;
        }
        if(document.documentElement){
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    };

    //浏览器视口的高度
    let getWindowHeight = function (){
        let windowHeight = 0;
        if(document.compatMode === "CSS1Compat"){
            windowHeight = document.documentElement.clientHeight;
        }else{
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    };
    //  是否移动到底部
    let scrollToTheBottom = function(func){
        window.onscroll = function(){
            if(getScrollTop() + getWindowHeight() === getScrollHeight()){
                func();
            }
        };
    };
    //  是否有滚动条
    let hasScrollbar = function() {
        return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
    };


    const setBaseFontSize = function(designWidth,rem2px){
        var d = window.document.createElement('div');
        d.style.width = '1rem';
        d.style.display = "none";
        var head = window.document.getElementsByTagName('head')[0];
        head.appendChild(d);
        var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
        d.remove();
        document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
        var st = document.createElement('style');
        var portrait = "@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+ ((window.innerWidth/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}";
        var landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+ ((window.innerHeight/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}"
        st.innerHTML = portrait + landscape;
        head.appendChild(st);
        return defaultFontSize
    };
    const parsePx = function(){
        let d = window.document.createElement('div');
        d.style.width = '1rem';
        d.style.display = "none";
        let head = window.document.getElementsByTagName('head')[0];
        head.appendChild(d);
        let rate = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
        d.remove();
        return rate;
    };
    return {
        scrollToTheBottom:scrollToTheBottom,
        setBaseFontSize:setBaseFontSize,
        parsePx:parsePx,
        hasScrollbar:hasScrollbar
    }
})();

HB.url = (function(){

    const getBaseUrl = function () {
        const host = window.location.host;
        let contextPath = document.location.pathname;
        const index = contextPath.substr(1).indexOf("/");
        contextPath = contextPath.substr(0, index + 1);
        return "http://" + host + contextPath;
    };

    const getSearchKey = function (name) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        const r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    const getHashKey = function (name) {
        const reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)", "i");
        const r = window.location.hash.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };
    //  从哪个URL之前的所有URL都要 （之后的不要）第二个参数就是来标记从哪开始之后的URL都不要（包括第二个参数在内）
    const setBrowserHistoryFromBefore = function (urls, url) {
        let urlIndex = urls.indexOf(url);
        let last = urlIndex + 1;
        urls.splice(last);
        for (let i = 0; i < urls.length; i++) {
            const setUrl = "#" + urls[i];
            history.pushState({}, "", setUrl);
        }
    };

    return {
        getBaseUrl:getBaseUrl,
        getSearchKey:getSearchKey,
        getHashKey:getHashKey,
        setBrowserHistoryFromBefore:setBrowserHistoryFromBefore
    }
})();

HB.save = (function(){

    const setStorage = function(obj){
        for(let prop in obj){
            localStorage[prop] = JSON.stringify(obj[prop]);
        }
    };


    return {
        setStorage:setStorage,
    }
})();

HB.loading = (function(){
    // const picLoad = function (picArr, baseUrl = "") {
    //     let successCounter = 0;
    //     let isSuccess = false;
    //     for (let i = 0; i < picArr.length; i++) {
    //         const url = baseUrl + picArr[i];
    //         $.ajax({
    //             type: 'GET',
    //             url: url,
    //             async: false
    //         }).done(function () {
    //             console.log("加在成功");
    //             successCounter++;
    //         });
    //     }
    //     if (successCounter === picArr.length) {
    //         isSuccess = true;
    //     }
    //     return isSuccess;
    // };

    return {
        // picLoad:picLoad
    }
})();
HB.load = function(arr,func){
    for(let i = 0;i < arr.length;i++){
        if(arr[i] === false){
            alert("未连接到网络 请重新尝试");
            return false;
        }
    }
    func();
};


HB.CSS3 = (function () {

    const getCSS3PropsVal = function(name){
        let prop = "";
        for(let i = name.length - 1;i >= 0;i-- ){
            prop += name[i];
            if(name[i] === "("){
                return prop.split("").reverse().join("");
            }
        }
    };
    const toArray = function(name){
        let css3PropsVal = getCSS3PropsVal(name);
        let prop = "";
        let propArrIndex = 0;
        const propArr = [];

        css3PropsVal = css3PropsVal.substr(1);
        css3PropsVal = css3PropsVal.replace(/\)/g, ",");

        for(let i = 0; i < css3PropsVal.length;i++){
            if(css3PropsVal[i] !== ","){
                prop += css3PropsVal[i];
            }else{
                propArr[propArrIndex] = prop;
                prop = "";
                propArrIndex+=1;
            }
        }
        return propArr;
    };

    const replaceProp = function(name,i,replaceVal){
        const propArr = toArray(name);
        let newCSS3 = "";

        propArr[i] = replaceVal;
        const valStr = propArr.join(',');

        for(let i = 0;i < name.length;i++){

            if(name[i] !== "("){
                newCSS3 += name[i];
            }else{
                return newCSS3 += ("(" + valStr +")");
            }
        }
    };

    return {
        getCSS3PropsVal:getCSS3PropsVal,
        toArray:toArray,
        replaceProp:replaceProp
    }
})();

HB.slide = function(str,func){
    // var touchStart_x = 0,
    //     touchEnd_x = 0,
    //     touchStart_y = 0,
    //     touchEnd_y = 0;
    //
    // const left = function(){
    //     if(str === 'left'&&touchStart_x - touchEnd_x > 0 ){
    //         console.log('left');
    //         func();
    //     }
    // };
    // const right = function(){
    //     if(str === 'right'&&touchStart_x - touchEnd_x < 0 ){
    //         console.log('right');
    //         // func();
    //     }
    // };
    //
    // $('body').bind("touchstart",function(e){
    //     touchStart_x = e.touches[0].clientX;
    //     touchStart_y = e.touches[0].clientY;
    // });
    // $('body').bind("touchend",function(e){
    //     touchEnd_x = e.changedTouches[0].clientX;
    //     touchEnd_y = e.changedTouches[0].clientY;
    //     return {
    //         left:left(),
    //         // right:right(),
    //         // up:up(),
    //         // down:down()
    //     };
    //
    // });
};

HB.design = (function(){

    class Chain{
        constructor(fn){
            this.fn = fn;
            this.success = null;
        }
        setNextSuccessor( successor ){
            return this.successor = successor;
        };
        passRequest(){
            let ret = this.fn.apply(this,arguments);
            if ( ret === 'nextSuccessor' ){
                return this.successor && this.successor.passRequest.apply( this.successor, arguments );
            }
            return ret;
        }
    }



    return {
        Chain:Chain,
    }

})();
Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
};
