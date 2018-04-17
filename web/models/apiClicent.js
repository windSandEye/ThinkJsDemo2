import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';


export function sendQequest({ url, method, body, headers }) {
  let basePath = location.protocol + "//" + location.host;
  url = basePath + url;
  let bodyParam = body;

  if (headers) {
    if (headers.indexOf('application/x-www-form-urlencoded') > -1 || headers.indexOf('multipart/form-data') > -1) {
      bodyParam = this.buildFormParams(this.normalizeParams(body));
    }
  } else {
    bodyParam = body ? JSON.stringify(body) : null;
  }
  //请求头封装
  headers = fullHeaders(headers);

  return fetch(url, {
    method: method,
    headers: headers,
    body: bodyParam,
    credentials: 'include'
  }).then(checkStatus).then(function (response) {
    return response.json().then(function (data) {
      return data;
    })
  });
}

//封装请求头
const fullHeaders = function (headerList) {
  //请求头封装
  let headers = new Headers();
  if (!headerList) {//默认返回方式
    headers.append('Accept', 'application/json;charset=UTF-8');
    headers.append('Content-Type', 'application/json;charset=UTF-8');
  } else {//所有返回方式都支持json格式
    let flag = false;
    for (let header of headerList) {
      if (/application\/json/.test(header)) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      headers.append('Accept', 'application/json;charset=UTF-8');
      headers.append('Content-Type', 'application/json;charset=UTF-8');
    }
    headers.append('Accept', headerList.jion(";"));
    headers.append('Content-Type', headerList.jion(";"));
  }

  return headers;
}

const buildFormParams = function (params) {
  if (!params) {
    return null;
  }
  var form = new FormData()
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      if (isFileParam(params[key])) {
        form.append('file', params[key])
      } else {
        form.append(key, params[key]);
      }
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
      if (this.isFileParam(value) || Array.isArray(value)) {//如果是数组，文件则不处理参数
        newParams[key] = value;
      } else {
        newParams[key] = this.paramToString(value);
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