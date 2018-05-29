/**
 * @Author: yuanshubing 
 * @Date: 2018-05-16 09:20:14 
 */
import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';

/*
  url:<String>请求路径，必须
  method:GET、PUT、POST、DELETE，请求方式，必须
  body:<Object>请求参数，可选
  headers:<Array>请求头设置，可选
*/
export function sendQequest({ url, method, body, queryParams = {},
  accept = 'application/json; charset=utf-8', contentType = 'application/json; charset=utf-8' }) {
  //拼接主机地址
  let basePath = location.protocol + "//" + location.host;
  //拼接请求路径
  url = basePath + url;

  // 为get请求添加时间戳，避免图片之内的不做二次响应                             
  if (method === 'GET') {
    queryParams._t = new Date().getTime();
    // 封装get请求的路径
    url += (url.indexOf('?') === -1 ? '?' : '&') +
      buildUrlParams(normalizeParams(queryParams));
  }

  let bodyParam = body;
  //请求头设置
  if (accept.indexOf('application/x-www-form-urlencoded') > -1 || accept.indexOf('multipart/form-data') > -1) {
    bodyParam = buildFormParams(normalizeParams(body));
  } else {
    function replacer(key, value) {//替换null为undefined的目地是：JSON解析的时候会忽略掉undefined的属性，而null会转换为'null'字符串
      if (value === null) {
        return undefined;
      }
      return value;
    }
    bodyParam = body ? JSON.stringify(body, replacer) : null;

  }
  //请求头封装
  const headers = fullHeaders(accept, contentType);




  return fetch(url, {
    method: method,
    headers: headers,
    body: bodyParam,
    credentials: 'include'
  }).then(checkStatus).then(function (response) {
    const contentType = response.headers.get('Content-Type');
    //json数据处理
    if (contentType.toLowerCase() == 'application/json; charset=utf-8') {
      return response.json().then(function (data) {
        return data;
      })
    } else if (contentType.toLowerCase() == "application/octet-stream") {//文件处理
      return response.blob().then(function (data) {
        let a = document.createElement('a');
        let url = window.URL.createObjectURL(data);
        let filename = response.headers.get('Content-Disposition').split("=")[1];
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      })
    } else {
      return response.text().then(function (data) {//文本处理
        return data;
      })
    }
  });
}

//封装请求头
const fullHeaders = function (accept, contentType) {
  //请求头封装
  let headers = new Headers();
  headers.append('Accept', accept);
  //上传文件的时候不需要设置content-type，因为fetch源码中会自动设置
  if (!(contentType.indexOf('application/x-www-form-urlencoded') > -1) && !(contentType.indexOf('multipart/form-data') > -1)) {
    headers.append('Content-Type', contentType);
  }
  return headers;
}

//get请求url封装
const buildUrlParams = function (params) {
  if (!params) {
    return null;
  }
  let paramStr = '';

  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      paramStr += '&' + key + '=' + encodeURIComponent(params[key]);
    }
  }
  return paramStr.substr(1);
};

//封装表单参数
const buildFormParams = function (params) {
  if (!params) {
    return null;
  }
  let form = new FormData()
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      form.append(key, params[key]);
    }
  }
  return form;
};

//判断参数是否是文件
const isFileParam = function (param) {
  if (typeof window === 'undefined' &&
    typeof require === 'function') {
    return true;
  }
  // Buffer in Node.js
  if (typeof Buffer === 'function' && param instanceof Buffer) {
    return true;
  }
  // Blob in browser
  if (typeof Blob === 'function' && param instanceof Blob) {
    return true;
  }
  // File in browser (it seems File object is also instance of Blob, but keep this for safe)
  if (typeof File === 'function' && param instanceof File) {
    return true;
  }
  return false;
};

//序列化参数
const normalizeParams = function (params) {
  let newParams = {};
  for (let key in params) {
    if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
      let value = params[key];
      if (isFileParam(value) || Array.isArray(value)) {//如果是数组，文件则不处理参数
        newParams[key] = value;
      } else {
        newParams[key] = paramToString(value);
      }
    }
  }
  return newParams;
};

//将参数转换为字符串
const paramToString = function (param) {
  if (param == undefined || param == null) {
    return '';
  }
  if (param instanceof Date) {
    return param.toJSON();
  }
  return param.toString();
};

//校验请求状态
const checkStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return ajaxError(response);
}


/**
 * 全局处理ajax错误.
 * @param response {Object} rest response.
 */
const ajaxError = function (response) {
  return response.json().then(function (data) { throw data });
};