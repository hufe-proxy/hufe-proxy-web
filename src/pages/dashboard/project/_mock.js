// eslint-disable-next-line import/no-extraneous-dependencies
export default {
  'POST  /canary-server/api/project/v1/list/by_search': (_, res) => {
    res.send({
      appid: 'aiyi_local',
      errorDetail: null,
      hostip: '127.0.0.1',
      success: true,
      traceid: '554',
      data: {
        count: 101,
        data: [],
      },
    });
  },
};
