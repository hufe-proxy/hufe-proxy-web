import { history } from 'umi';
import { message } from 'antd';
import { parse } from 'qs';
import { apiLogin } from './service';
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
export function setAuthority(authority) {
  const proAuthority = authority.roleType === 0 ? ['admin'] : ['user'];
  // 设置权限&token
  localStorage.setItem('canary-authority', JSON.stringify(proAuthority));
  localStorage.setItem('token', authority.token);
  // 设置内容
  localStorage.setItem('info', JSON.stringify(authority))
  try {
    if (window.reloadAuthorized) {
      window.reloadAuthorized();
    }
  } catch (error) {
    // do not need do anything
  }

  return authority;
}
const Model = {
  namespace: 'userAndlogin',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(apiLogin, payload);
      if (!response.success || !response.data) return;
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      message.success('登录成功！');
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params;

      if (redirect) {
        const redirectUrlParams = new URL(redirect);

        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);

          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = redirect;
          return;
        }
      }

      history.replace(redirect || '/');
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.data);
      return { ...state, status: payload.success };
    },
  },
};
export default Model;
