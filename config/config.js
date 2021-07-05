// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default defineConfig({
  base: '/winex-proxy-web/',
  publicPath: '/winex-proxy-web/',
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          routes: [
            {
              path: '/',
              redirect: '/dashboard/publish_log',
            },
            {
              name: 'dashboard',
              icon: 'control',
              path: '/dashboard',
              routes: [
                {
                  path: '/',
                  redirect: '/dashboard/publish_log',
                },
                {
                  name: 'publish_log',
                  icon: 'code',
                  path: '/dashboard/publish_log',
                  component: './dashboard/publishLog',
                },
                {
                  name: 'mock_log',
                  icon: 'code',
                  path: '/dashboard/mock_log',
                  component: './dashboard/mockLog',
                },
                {
                  name: 'project',
                  icon: 'database',
                  path: '/dashboard/project',
                  component: './dashboard/project',
                },
                {
                  name: 'instruction',
                  icon: 'compass',
                  path: '/dashboard/instruction',
                  component: './dashboard/instruction',
                }
              ],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  exportStatic: {},
  esbuild: {},
  chainWebpack: function (config) {
    config.plugin("MonacoWebpackPlugin").use(MonacoWebpackPlugin)
  }
});
