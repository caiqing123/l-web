import CryptoJS from 'crypto-js';
import uploadConfig from '@/config/upload';

// const typeColor = (type = 'default') => {
//   let color = '';
//   switch (type) {
//     case 'default': color = '#35495E'; break;
//     case 'primary': color = '#3488ff'; break;
//     case 'success': color = '#43B883'; break;
//     case 'warning': color = '#e6a23c'; break;
//     case 'danger': color = '#f56c6c'; break;
//     default: break;
//   }
//   return color;
// };

const tool = {};

/**
 * LocalStorage
 */
tool.local = {
  set(table, settings) {
    const set = JSON.stringify(settings);
    return localStorage.setItem(table, set);
  },
  get(table) {
    let data = localStorage.getItem(table);
    try {
      data = JSON.parse(data);
    } catch (err) {
      return null;
    }
    return data;
  },
  remove(table) {
    return localStorage.removeItem(table);
  },
  clear() {
    return localStorage.clear();
  },
};

/**
 * SessionStorage
 */
tool.session = {
  set(table, settings) {
    const set = JSON.stringify(settings);
    return sessionStorage.setItem(table, set);
  },
  get(table) {
    let data = sessionStorage.getItem(table);
    try {
      data = JSON.parse(data);
    } catch (err) {
      return null;
    }
    return data;
  },
  remove(table) {
    return sessionStorage.removeItem(table);
  },
  clear() {
    return sessionStorage.clear();
  },
};

/**
 * CookieStorage
 */
tool.cookie = {
  set(name, value, config = {}) {
    const cfg = {
      expires: null,
      path: null,
      domain: null,
      secure: false,
      httpOnly: false,
      ...config,
    };
    let cookieStr = `${name}=${escape(value)}`;
    if (cfg.expires) {
      const exp = new Date();
      exp.setTime(exp.getTime() + parseInt(cfg.expires, 10) * 1000);
      cookieStr += `;expires=${exp.toGMTString()}`;
    }
    if (cfg.path) {
      cookieStr += `;path=${cfg.path}`;
    }
    if (cfg.domain) {
      cookieStr += `;domain=${cfg.domain}`;
    }
    document.cookie = cookieStr;
  },
  get(name) {
    const arr = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`));
    if (arr != null) {
      return unescape(arr[2]);
    }
    return null;
  },
  remove(name) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    document.cookie = `${name}=;expires=${exp.toGMTString()}`;
  },
};

/* Fullscreen */
tool.screen = (element) => {
  const isFull = !!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
  if (isFull) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  } else if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
};

/* 复制对象 */
tool.objCopy = (obj) => JSON.parse(JSON.stringify(obj));

/* 千分符 */
tool.groupSeparator = (nums) => {
  let num = nums;
  num += '';
  if (!num.includes('.')) {
    num += '.';
  }
  return num.replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => `${$1},`).replace(/\.$/, '');
};

tool.md5 = (str) => CryptoJS.MD5(str).toString();

tool.base64 = {
  encode(data) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data));
  },
  decode(cipher) {
    return CryptoJS.enc.Base64.parse(cipher).toString(CryptoJS.enc.Utf8);
  },
};

tool.aes = {
  encode(data, secretKey) {
    const result = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(secretKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return result.toString();
  },
  decode(cipher, secretKey) {
    const result = CryptoJS.AES.decrypt(cipher, CryptoJS.enc.Utf8.parse(secretKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(result);
  },
};

tool.download = (res, downName = '') => {
  const aLink = document.createElement('a');
  const blob = new Blob([res.data], { type: res.headers['content-type'].replace(';charset=utf8', '') });

  let fileName;
  if (!downName) {
    const contentDisposition = decodeURI(res.headers['content-disposition']);
    const result = contentDisposition.match(/filename\*=utf-8(.+)/gi);
    fileName = result[0].replace(/filename\*=utf-8/gi, '');
  } else {
    fileName = downName;
  }
  aLink.href = URL.createObjectURL(blob);
  // 设置下载文件名称
  aLink.setAttribute('download', fileName);
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
  URL.revokeObjectURL(aLink.href);
};

/**
 * 对象转url参数
 * @param {*} data
 * @param {*} isPrefix
 */
tool.httpBuild = (data, isPrefix = false) => {
  const prefix = isPrefix ? '?' : '';
  const result = [];

  data.forEach((key) => {
    const value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].includes(value)) {
      return;
    }
    if (value.constructor === Array) {
      value.forEach((val) => {
        result.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(val)}`);
      });
    } else {
      result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });

  return result.length ? prefix + result.join('&') : '';
};

tool.attachUrl = (path, defaultStorage = 'LOCAL') => uploadConfig.storage[defaultStorage] + path;

/**
 * 获取token
 */
tool.getToken = () => tool.local.get('token');
/**
 * 转Unix时间戳
 */

tool.toUnixTime = (date) => Math.floor((new Date(date)).getTime() / 1000);

export default tool;
