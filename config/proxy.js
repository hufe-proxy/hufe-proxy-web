/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/winex-proxy-server': {
      target: 'http://localhost:18080',
      changeOrigin: true,
      pathRewrite: {
        '^/winex-proxy-server': '/',
      },
    },
    '/winex-proxy-docs': {
      target: 'http://172.16.6.214',
      changeOrigin: true,
      pathRewrite: {
        '^/winex-proxy-server': '/winex-proxy-server',
      },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
