import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Popconfirm, Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import CreateUpdateForm from './components/CreateUpdateForm'
import { ProjectSourceType } from '../../../dataobject/enum/index'
import { apiGetProjectList, apiAddProject, apiDeleteProject, apiUpdateProject } from './service';

const Project = () => {
  const actionRef = useRef();

  const [formItemValues, setFormItemValues] = useState({});
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);


  // 处理form请求
  const handleRequest = async (params) => {
    const res = await apiGetProjectList({
      pageSize: params.pageSize,
      pageNo: params.current - 1,
      keyword: params.name || null,
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
      apiAddProject({
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
    const res = await apiDeleteProject({ id });
    if (res.success && actionRef.current) {
      actionRef.current.reload();
    }
  }

  // 处理更新
  const handleUpdate = async (params) => {
    return new Promise((resolve, reject) => {
      apiUpdateProject({
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
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      copyable: true,
    },
    {
      title: '来源',
      dataIndex: 'sourceType',
      search: false,
      valueEnum: {
        [ProjectSourceType.Outpatient]: { text: "门诊" },
        [ProjectSourceType.Inpatient]: { text: "住院" },
      },
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
      width: 150,
      render: (_, record) => (
        <>
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
            title={`确定删除${record.name}？`}
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
        headerTitle="项目信息"
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

export default connect(({ project }) => ({
  project,
}))(Project);
