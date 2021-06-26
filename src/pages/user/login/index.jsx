import { Alert, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import md5 from 'blueimp-md5';
import styles from './style.less';
import LoginFrom from './components/Login';
const { Tab, UserName, Password, Submit } = LoginFrom;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userAndlogin = {}, submitting } = props;
  const { status, type: loginType } = userAndlogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'userAndlogin/login',
      payload: {
        account: values.account,
        password: md5(values.password),
      },
    });
  };

  useEffect(() => {
    localStorage.removeItem('canary-authority');
    localStorage.removeItem('token');
    localStorage.removeItem('info');
  }, []);

  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="账号或密码错误" />
          )}

          <UserName
            name="account"
            placeholder="账号"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
        </div>
        <Submit loading={submitting}>登录</Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(({ userAndlogin, loading }) => ({
  userAndlogin,
  submitting: loading.effects['userAndlogin/login'],
}))(Login);
