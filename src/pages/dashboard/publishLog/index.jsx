import React, { useRef, useState, useEffect } from 'react';
import ClipboardJS from 'clipboard'
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Popconfirm, Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import CreateUpdateForm from './components/CreateUpdateForm'
import ProjectSearch from './components/ProjectSearch'
import { ProjectSourceType } from '../../../dataobject/enum/index'
import { apiGetPublishLogList, apiAddPublishLog, apiDeletePublishLog } from './service';

const PublishLog = (props) => {
  const actionRef = useRef();

  const [projectId, setProjectId] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  useEffect(() => {
    const { dispatch } = props;
    dispatch({
      type: 'publishLog/getProjectOption',
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-new
    new ClipboardJS('.copy')
  }, [])

  // 选择项目
  const handleProjectIdValueChange = (params) => {
    setProjectId(params);
    actionRef.current.reload();
  };

  // 处理form请求
  const handleRequest = async (params) => {
    const res = await apiGetPublishLogList({
      pageSize: params.pageSize,
      pageNo: params.current - 1,
      projectId,
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
      apiAddPublishLog({
        name: params.name,
        projectId: params.projectId,
        attach: params.attach[0].originFileObj
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
    const res = await apiDeletePublishLog({ id });
    if (res.success && actionRef.current) {
      actionRef.current.reload();
    }
  }

  const tableColumns = [
    {
      title: '项目',
      hideInTable: true,
      key: 'projectId',
      dataIndex: 'projectId',
      renderFormItem: (_, { type, defaultRender, ...rest }) => {
        return (
          <ProjectSearch
            value={projectId}
            onChange={handleProjectIdValueChange}
            {...rest}
          />
        );
      },
    },
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      copyable: true,
      search: false
    },
    {
      title: '发布名称（备注）',
      dataIndex: 'publishLogName',
      key: 'publishLogName',
      search: false
    },
    {
      title: '项目类别',
      dataIndex: 'projectSourceType',
      search: false,
      valueEnum: {
        [ProjectSourceType.Outpatient]: { text: "门诊" },
        [ProjectSourceType.Inpatient]: { text: "住院" },
        [ProjectSourceType.Other]: { text: "其他" },
      },
    },
    {
      title: '发布人',
      dataIndex: 'userName',
      key: 'userName',
      search: false
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
            className="copy"
            data-clipboard-text={record.proxyScript}
            onClick={
              () => message.success('复制成功')
            }
          >
            复制代理脚本
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title={`确定删除${record.projectName}（${record.publishLogName}）？`}
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
        headerTitle="发布信息"
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
    </PageContainer>
  );
};

export default connect()(PublishLog);
