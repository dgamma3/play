import {validatenull} from './validate';
import axios from 'axios';
import {baseUrl} from "@/config/env";
import {getStore} from "@/utils/store.js";
import website from '@/config/website';
import router from '@/router';
import sw from "element-ui/src/locale/lang/sw";
import JSEncrypt from 'jsencrypt';
//表单序列化
export const serialize = data => {
  let list = [];
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&');
};
export const getObjType = obj => {
  let toString = Object.prototype.toString;
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};
export const getViewDom = () => {
  return window.document.getElementById('avue-view').getElementsByClassName('el-scrollbar__wrap')[0]
}
/**
 * 对象深拷贝
 */
export const deepClone = data => {
  let type = getObjType(data);
  let obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (let key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
  if (status) {
    document.body.className = document.body.className + ' grayMode';
  } else {
    document.body.className = document.body.className.replace(' grayMode', '');
  }
};
/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.body.className = name;
}

/**
 * 加密处理
 */
export const encryption = (params) => {
  let {
    data,
    type,
    param,
    key
  } = params;
  let result = JSON.parse(JSON.stringify(data));
  if (type == 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele]);
    })
  } else if (type == 'Aes') {
    param.forEach(ele => {
      result[ele] = window.CryptoJS.AES.encrypt(result[ele], key).toString();
    })

  }
  return result;
};


/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen();
  } else {
    reqFullScreen();
  }
};

/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback()
  }

  document.addEventListener("fullscreenchange", function () {
    listen();
  });
  document.addEventListener("mozfullscreenchange", function () {
    listen();
  });
  document.addEventListener("webkitfullscreenchange", function () {
    listen();
  });
  document.addEventListener("msfullscreenchange", function () {
    listen();
  });
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  let isFullscreen = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
  return isFullscreen;
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
};

/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
};

/**
 * 递归寻找子类的父类
 */
export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length != 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id == id) {
          return menu[i];
        } else {
          if (menu[i].children[j].children.length != 0) {
            return findParent(menu[i].children[j].children, id);
          }
        }
      }
    }
  }
};
/**
 * 判断2个对象属性和值是否相等
 */

/**
 * 动态插入css
 */

export const loadStyle = url => {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
};
/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
  delete obj1.close;
  let o1 = obj1 instanceof Object;
  let o2 = obj2 instanceof Object;
  if (!o1 || !o2) { /*  判断不是对象  */
    return obj1 === obj2;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (let attr in obj1) {
    let t1 = obj1[attr] instanceof Object;
    let t2 = obj2[attr] instanceof Object;
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr]);
    } else if (obj1[attr] !== obj2[attr]) {
      return false;
    }
  }
  return true;
}
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = '';
  if (validatenull(dic)) return value;
  if (typeof (value) == 'string' || typeof (value) == 'number' || typeof (value) == 'boolean') {
    let index = 0;
    index = findArray(dic, value);
    if (index != -1) {
      result = dic[index].label;
    } else {
      result = value;
    }
  } else if (value instanceof Array) {
    result = [];
    let index = 0;
    value.forEach(ele => {
      index = findArray(dic, ele);
      if (index != -1) {
        result.push(dic[index].label);
      } else {
        result.push(value);
      }
    });
    result = result.toString();
  }
  return result;
};
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i;
    }
  }
  return -1;
};
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = '';
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len ? len : 4);
  if (date) random = random + Date.now();
  return random;
};
/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

  const left = ((width / 2) - (w / 2)) + dualScreenLeft
  const top = ((height / 2) - (h / 2)) + dualScreenTop
  const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
}

/**
 * 获取顶部地址栏地址
 */
export const getTopUrl = () => {
  return window.location.href.split("/#/")[0];
}

/**
 * 获取url参数
 * @param name 参数名
 */
export const getQueryString = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(decodeURI(r[2]));
  return null;
}

/**
 * 下载文件
 * @param {String} path - 文件地址
 * @param {String} name - 文件名,eg: test.png
 */
export const downloadFileBlob = (path, name) => {
  const xhr = new XMLHttpRequest();
  xhr.open('get', path);
  xhr.responseType = 'blob';
  xhr.send();
  xhr.onload = function () {
    if (this.status === 200 || this.status === 304) {
      // 如果是IE10及以上，不支持download属性，采用msSaveOrOpenBlob方法，但是IE10以下也不支持msSaveOrOpenBlob
      if ('msSaveOrOpenBlob' in navigator) {
        navigator.msSaveOrOpenBlob(this.response, name);
        return;
      }
      const url = URL.createObjectURL(this.response);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
}

/**
 * 下载文件
 * @param {String} path - 文件地址
 * @param {String} name - 文件名,eg: test.png
 */
export const downloadFileBase64 = (path, name) => {
  const xhr = new XMLHttpRequest();
  xhr.open('get', path);
  xhr.responseType = 'blob';
  xhr.send();
  xhr.onload = function () {
    if (this.status === 200 || this.status === 304) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.response);
      fileReader.onload = function () {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = this.result;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    }
  };
}

/**
 * GET网络请求
 * @param url
 * @param param
 * @param successCallback
 * @param errorCallback
 * @param headers
 */
export const ttGet = (url, params, successCallback, errorCallback, headers) => {
  if (headers == undefined) headers = {};
  headers.secret = website.clientSecret;
  let login_token = getStore({name: 'login_token'});
  if (login_token) headers.token = login_token;
  let jwt_token = getStore({name: 'jwt_token'});
  if (jwt_token) headers.Authorization = `Basic ${jwt_token}`;
  axios.get(baseUrl + url, {
    params: params,
    headers: headers
  })
    .then((res) => {
      if (res.data.code == 401) return router.push({path: '/cclladminlogin/login/login'});
      successCallback && successCallback(res.data);
    })
    .catch(function (error) { // 请求失败处理
      console.log(error);
      errorCallback && errorCallback(error);
    });
}

/**
 * POST网络请求
 * @param url
 * @param param
 * @param successCallback
 * @param errorCallback
 * @param headers
 */
export const ttPost = (url, params, successCallback, errorCallback, headers) => {
  if (headers == undefined) headers = {};
  headers.secret = website.clientSecret;
  let login_token = getStore({name: 'login_token'});
  if (login_token) headers.token = login_token;
  let jwt_token = getStore({name: 'jwt_token'});
  if (jwt_token) headers.Authorization = `Basic ${jwt_token}`;
  axios.post(baseUrl + url, params, {
    headers: headers
  })
    .then((res) => {
      if (res.data.code == 401) return router.push({path: '/cclladminlogin/login/login'});
      successCallback && successCallback(res.data);
    })
    .catch(function (error) { // 请求失败处理
      console.log(error);
      errorCallback && errorCallback(error);
    });
}

/**
 * 饰品磨损解析
 * @param abrasion
 * @returns {string}
 */
export const abrasion = (abrasion) => {
  let info = '';
  switch (Number(abrasion)) {
    case 1:
      info = '崭新出厂';
      break;
    case 2:
      info = '略有磨损';
      break;
    case 3:
      info = '久经沙场';
      break;
    case 4:
      info = '破损不堪';
      break;
    case 5:
      info = '战痕累累';
      break;
    case 6:
      info = '';
      break;
  }
  return info;
}

/**
 * 饰品类别解析
 * @param quality
 * @param type
 * @returns {string}
 */
export const quality = (quality, type = 1) => {
  let info = '';
  if (type == 1) {
    switch (Number(quality)) {
      case 1:
        info = '普通';
        break;
      case 2:
        info = 'StatTrak™';
        break;
      case 3:
        info = '纪念品';
        break;
      case 4:
        info = '★';
        break;
      case 5:
        info = '★ StatTrak™';
        break;
    }
  } else if (type == 2) {
    switch (Number(quality)) {
      case 1:
        info = '';
        break;
      case 2:
        info = 'StatTrak™';
        break;
      case 3:
        info = '纪念品';
        break;
      case 4:
        info = '';
        break;
      case 5:
        info = '★ StatTrak™';
        break;
    }
  } else if (type == 3) {
    switch (Number(quality)) {
      case 1:
        info = '';
        break;
      case 2:
        info = ', StatTrak™';
        break;
      case 3:
        info = ', 纪念品';
        break;
      case 4:
        info = '';
        break;
      case 5:
        info = ', ★ StatTrak™';
        break;
    }
  }
  return info;
}

/**
 * 饰品类别解析
 * @param quality2
 * @returns {string}
 */
export const quality2 = (quality2) => {
  let info = '';
  switch (Number(quality2)) {
    case 1:
      info = '标准';
      break;
    case 2:
      info = '冥灵';
      break;
    case 3:
      info = '铭刻';
      break;
    case 4:
      info = '传奇';
      break;
    case 5:
      info = '尊享';
      break;
    case 6:
      info = '纯正';
      break;
    case 7:
      info = '亲笔签名';
      break;
    case 8:
      info = '独特';
      break;
    case 9:
      info = '吉祥';
      break;
  }
  return info;
}

/**
 * 饰品颜色解析
 * @param color
 * @param type
 * @returns {string}
 */
export const color = (color, type = 1) => {
  let info = '';
  if (type == 1) {
    switch (Number(color)) {
      case 1:
        info = '金色';
        break;
      case 2:
        info = '红色';
        break;
      case 3:
        info = '粉色';
        break;
      case 4:
        info = '紫色';
        break;
      case 5:
        info = '蓝色';
        break;
      case 6:
        info = '浅蓝色';
        break;
      case 7:
        info = '白色';
        break;
    }
  } else if (type == 2) {
    switch (Number(color)) {
      case 1:
        info = '#e4ae39';
        break;
      case 2:
        info = '#eb4b4b';
        break;
      case 3:
        info = '#d32ce6';
        break;
      case 4:
        info = '#8847ff';
        break;
      case 5:
        info = '#4b69ff';
        break;
      case 6:
        info = '#5e98d9';
        break;
      case 7:
        info = '#b0c3d9';
        break;
    }
  } else if (type == 3) {
    switch (Number(color)) {
      case 1:
        info = 'o-golden';
        break;
      case 2:
        info = 'o-red';
        break;
      case 3:
        info = 'o-pink';
        break;
      case 4:
        info = 'o-purple';
        break;
      case 5:
        info = 'o-blue';
        break;
      case 6:
        info = 'o-wathet';
        break;
      case 7:
        info = 'o-white';
        break;
    }
  }else if (type == 4) {
    switch (Number(color)) {
      case 1:
        info = 'huang';
        break;
      case 2:
        info = 'hong';
        break;
      case 3:
        info = 'fen';
        break;
      case 4:
        info = 'zi';
        break;
      case 5:
        info = 'lan';
        break;
      case 6:
        info = 'bai';
        break;
      case 7:
        info = 'bai';
        break;
        default:info='bai';break;
    }
  }
  return info;
}

/**
 * WebSocket请求
 * @param method
 */
export const ttWebSocket = (method, field, successCallback, oncloseStatus) => {
  let ws, timeid, url;
  if (baseUrl.includes("https://")) {
    url = baseUrl.replace(/https:\/\//, "wss://") + '/wss';
   // url = baseUrl.replace(/https:\/\//, "wss://") + '/wss';
  } else if (baseUrl.includes("http://")) {
    // url = baseUrl.replace(/http:\/\//, "ws://") + ':25646';//25648
    url = baseUrl.replace(/http:\/\//, "ws://") + ':39000';
  }
  url -+ "/api/worker";
  ws = new WebSocket(url);
  ws.onopen = function () {
    let jwt_token = getStore({name: 'jwt_token'});
    if (jwt_token) field.jwt_token = jwt_token;
    ws.send(JSON.stringify({method: method, field: field}));
    timeid = setInterval(function () {
      ws.send("ping");
    }, 10000);
  };
  ws.onmessage = function (e) {
    let data = JSON.parse(e.data);
    successCallback && successCallback(data);
  };
  ws.onclose = function () {
    clearInterval(timeid);
    let ws_close_manual = false;
    oncloseStatus((res) => {
      if (res){
        ws_close_manual = true;
      }
    });
    if (ws_close_manual){
      ws_close_manual = false;
      return false;
    }
    setTimeout(function () {
      ttWebSocket(method, field, successCallback, oncloseStatus);
    }, 1000);
  }
  return ws;
}

/**
 * 补齐图片链接
 * @param method
 */
export const repair = (url) => {
  if (url && url.search("http") == -1) {
    return baseUrl + '/public/uploads/' + url;
  }
  return url;
}

/**
 * 判断是否数组中是否存在
 * @param val
 * @param arr
 * @returns {string|number}
 */
export const inArray = (val, arr) => {
  for (let x in arr) {
    if (arr[x] == val) {
      return x;
    }
  }
  return -1;
}

/**
 * 取[min, max]之间的随机整数
 * @param min
 * @param max
 * @returns {*}
 */
export const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 转义 元素的innerHTML内容即为转义后的字符
 * @param str
 * @returns {string}
 */
export const htmlEncode = (str) => {
  return str.replace(/(["'<>]|&(?:(amp|lt|gt|#39|nbsp|quot|#\d+);)?)/g, (a, b, c) =>
    c
      ? a
      : {
        '<': '&lt;',
        '&': '&amp;',
        '"': '&quot;',
        '>': '&gt;',
        "'": '&#39;'
      }[a]
  )
}

/**
 * 解析 元素的innerHTML内容即为转义后的字符
 * @param str
 * @returns {string}
 */
export const htmlDecode = (str) => {
  return str.replace(/&(amp|gt|lt|quot|#39|nbsp);/g, (a) => {
    return {
      "&lt;": "<",
      "&amp;": "&",
      "&quot;": '"',
      "&gt;": ">",
      "&#39;": "'",
      "&nbsp;": " ",
    }[a];
  });
}


/**
 * 公钥--RSA加密
 * @param {*} word 需要加密的字符串
 * @param {*} publicKey 公钥
 * @returns
 */
export function rsa_encrypt(word) {
  const encryptor = new JSEncrypt();
  var publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJGpeoaEU3RpOeIrDRMWxUoRbvH2mJ2059KHXiN0hjyo7ZrmcgNZv5+niJR/gmCBwWZQnwM5B3bQOKYvEQstSnUCAwEAAQ==';
  encryptor.setPublicKey(publicKey);
  return encryptor.encrypt(word);
}

/**
 * 生成n位数字字母混合字符串
 */
export function  generateMixed(n) {
  var chars = ['0','1','2','3','4','5','6','7','8','9',
              'A','B','C','D','E','F','G','H','I','J','K','L','M',
              'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var res = "";
  for(var i = 0; i < n ; i++) {
     var id = Math.floor(Math.random()*36);
     res += chars[id];
  }
  return res;
}
