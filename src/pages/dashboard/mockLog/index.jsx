import React, { useRef, useState, useEffect } from 'react';
import ClipboardJS from 'clipboard'
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Popconfirm, Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import CreateUpdateForm from './components/CreateUpdateForm'
import { apiGetMockList, apiAddMock, apiDeleteMock, apiUpdateMock } from './service';

const MockLog = () => {
  const actionRef = useRef();

  const [formItemValues, setFormItemValues] = useState({});
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-new
    new ClipboardJS('.copy')
  }, [])


  // 处理form请求
  const handleRequest = async (params) => {
    const res = await apiGetMockList({
      pageSize: params.pageSize,
      pageNo: params.current - 1,
      keyword: params.address || null,
    });
    if (res && res.success) {
      const { data } = res;
      return {
        data: data.data,
        total: data.count,
        success: true,
      };
    }
    // 清空
    return {
      data: [],
      success: true,
      total: 0,
    };
  };

  // 处理新增
  const handleAdd = async (params) => {
    return new Promise((resolve, reject) => {
      apiAddMock({
        ...params,
      })
        .then(res => {
          if (res.success && actionRef.current) {
            setCreateModalVisible(false);
            actionRef.current.reload();
            resolve()
          } else {
            reject(res.errorDetail)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  };

  // 处理删除
  const handleDelete = async (id) => {
    const res = await apiDeleteMock({ id });
    if (res.success && actionRef.current) {
      actionRef.current.reload();
    }
  }

  // 处理更新
  const handleUpdate = async (params) => {
    return new Promise((resolve, reject) => {
      apiUpdateMock({
        ...params,
        id: formItemValues.id,
      })
        .then(res => {
          if (res.success && actionRef.current) {
            setUpdateModalVisible(false);
            actionRef.current.reload();
            resolve()
          } else {
            reject(res.errorDetail)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  };

  const tableColumns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: '代理地址',
      dataIndex: 'address',
      key: 'address',
      copyable: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      search: false,
      hideInForm: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (_, record) => (
        <>
          <a
            className="copy"
            data-clipboard-text={record.proxyScript}
            onClick={
              () => message.success('复制成功')
            }
          >
            复制代理脚本
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setUpdateModalVisible(true);
              setFormItemValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title={`确定删除${record.address}？`}
            okText="确定"
            cancelText="取消"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={tableColumns}
        actionRef={actionRef}
        request={handleRequest}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter={false}
        headerTitle="mock列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setCreateModalVisible(true)}
          >
            新建
          </Button>,
        ]}
      />
      {createModalVisible ? (
        <CreateUpdateForm
          onCancel={() => setCreateModalVisible(false)}
          onSubmit={handleAdd}
          modalVisible={createModalVisible}
        />
      ) : null}
      {formItemValues && Object.keys(formItemValues).length && updateModalVisible ? (
        <CreateUpdateForm
          onSubmit={handleUpdate}
          onCancel={() => setUpdateModalVisible(false)}
          modalVisible={updateModalVisible}
          values={formItemValues}
        />
      ) : null}
    </PageContainer>
  );
};

export default connect(({ mockLog }) => ({
  mockLog,
}))(MockLog);
