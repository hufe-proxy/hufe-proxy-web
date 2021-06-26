/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { history } from 'umi'
/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response, data } = error;
  if (!data) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  } else {
    if (response.status === 401) {
      history.push(`/user/login`)
    }
    notification.error({
      message: data.errorDetail || '未经处理的异常',
    });
  }
  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  prefix: '/canary-server',
  // headers: { 'Content-Type': 'application/json' },
  errorHandler,
  credentials: 'include', // 默认请求是否带上cookie
});

// 请求拦截
// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  const { headers } = options;
  headers['X-Token'] = localStorage.getItem('token') || '';
  return {
    options: { ...options },
  };
});

// 响应拦截
request.interceptors.response.use(async (response) => {
  if (response.status === 200) {
    const data = await response.clone().json();
    if (!data.success && data.errorDetail) {
      notification.error({
        message: data.errorDetail,
      });
    }
  }
  return response;
});
export default request;
