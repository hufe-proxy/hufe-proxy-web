import { apiGetProjectOption } from './service';

const Model = {
  namespace: 'publishLog',
  state: {
    projectOptions: [],
  },
  effects: {
    *getProjectOption(_, { call, put }) {
      const response = yield call(apiGetProjectOption);
      const payload = response.success && response.data ? response.data : [];
      yield put({
        payload,
        type: 'setProjectOption',
      });
    },
  },
  reducers: {
    setProjectOption(state, { payload }) {
      return { ...state, projectOptions: payload };
    },
  },
};
export default Model;
