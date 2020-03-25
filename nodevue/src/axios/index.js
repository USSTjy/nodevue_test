import axios from 'axios';
import CONFIG from '../config';
import router from '../router';

/* eslint-disable */
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; // 配置请求头
// 添加一个请求拦截器
axios.interceptors.request.use((conf) => {
  const config = conf;
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use((res) => {
  const response = res;
  if (response.data && response.data.code) {
    const resDataCode = parseInt(response.data.code, 10);
    const resDataMsg = response.data.msg;
    const codeFlag = resDataCode === 108 || resDataCode === 109;
    const msgFlag = resDataMsg === 'TOKEN失效，请重新登录' || resDataMsg === 'TOKEN不存在';
    if (codeFlag || msgFlag) {
      // 未登录
      response.data.msg = '登录信息已失效，请重新登录';
      router.push('/');
    }
    if (parseInt(response.data.code, 10) === -1) {
      console.log('请求失败');
    }
  }
  return response;
}, (error) => {
  console.dir(error);
  console.log('服务器连接失败');
});

// 基地址
const base = CONFIG.baseURL;

// 通用方法
export const POST = (url, params) => {
  if (url.indexOf('.json') > 0) {
    return axios.get(`${url}`, {
      params,
    }).then((res) => res.data);
  }
  return axios.post(`${base}${url}`, params).then((res) => res.data);
};

export const GET = (url, params) => {
  if (url.indexOf('.json') > 0) {
    return axios.get(`${url}`).then((res) => res.data);
  }
  return axios.get(`${base}${url}`, {
    params,
  }).then((res) => res.data);
};

export const PUT = (url, params) => axios.put(`${base}${url}`, params).then((res) => res.data);

export const DELETE = (url, params) => axios.delete(`${base}${url}`, {
  params,
}).then((res) => res.data);

export const PATCH = (url, params) => axios.patch(`${base}${url}`, params).then((res) => res.data);
