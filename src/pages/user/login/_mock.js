// eslint-disable-next-line import/no-extraneous-dependencies
import md5 from 'blueimp-md5';

export default {
  'POST /winex-proxy-server/api/common/v1/login': (req, res) => {
    const { password, account } = req.body;

    if (password === md5('123456') && account === 'admin') {
      res.send({
        appid: 'aiyi_local',
        data: { token: 'admin123456', roleType: 0, name: null, kindergartenName: null, kindergartenId: null },
        errorDetail: null,
        hostip: '127.0.0.1',
        success: true,
        traceid: '554',
      });
      return;
    }

    res.send({
      appid: 'aiyi_local',
      data: null,
      errorDetail: '手机号或密码错误',
      hostip: '127.0.0.1',
      success: false,
      traceid: '554',
    });
  },
};
