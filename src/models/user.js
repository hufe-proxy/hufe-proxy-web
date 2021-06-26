import { history } from 'umi';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchCurrent(_, { put }) {
      const infoStr = localStorage.getItem('info')
      if (!infoStr) {
        history.push(`/user/login`);
        return
      }
      const info = JSON.parse(infoStr)
      const response = { name: info.name ? `${info.name}（${info.kindergartenName}）` : '超级管理员' };
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
  },
};
export default UserModel;
