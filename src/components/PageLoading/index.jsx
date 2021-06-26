import React from 'react';
import { PageLoading } from '@ant-design/pro-layout'; // loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport

export default () => {
  return <PageLoading tip="加载中" />;
};
