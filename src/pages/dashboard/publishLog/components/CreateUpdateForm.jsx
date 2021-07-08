import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Button, Input, Modal, Select, Upload, message } from 'antd';
import style from './form.less';
import { connect } from 'umi'

const formLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 18,
    offset: 1,
  },
};

const UpdateForm = (props) => {
  const { modalVisible, onCancel, onSubmit: handleSubmit, values } = props;

  const [formVals, setFormVals] = useState({
    name: values ? values.name : '',
    projectId: values ? values.projectId : null
  });
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm();

  useEffect(() => {
    const { dispatch, projectOptions } = props;
    if (Array.isArray(projectOptions) && projectOptions.length) {
      return
    }
    dispatch({
      type: 'publishLog/getProjectOption',
    });
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  const onSumit = async () => {
    try {
      setLoading(true)
      const fieldsValue = await form.validateFields();
      const newVal = { ...formVals, ...fieldsValue};
      setFormVals(newVal);
      await handleSubmit(newVal);
    } catch (error) {
      console.log('操作失败: ', error);
      setLoading(false)
    }
  };

  return (
    <Modal
      destroyOnClose
      title={values ? '更新发布' : '新增发布'}
      visible={modalVisible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          ...formVals,
        }}
      >
        <Form.Item
          name="name"
          label="发布备注"
          rules={[
            {
              required: true,
              message: '请输入发布名称（备注）',
            },
          ]}
        >
          <Input placeholder="请输入发布名称（备注）" />
        </Form.Item>

        <Form.Item
          name="projectId"
          label="项目类别"
          rules={[
            {
              required: true,
              message: '请选择项目类别',
            },
          ]}
        >
          <Select
            options={props.projectOptions}
            placeholder="请选择项目类别"
          />
        </Form.Item>

        <Form.Item
          name="attach"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
          extra="限制10MB以内zip项目包"
          label="项目压缩包"
          rules={[
            {
              required: true,
              message: '请上传项目压缩包',
            },
          ]}
        >
          <Upload {...{
            onRemove: () => {
              form.setFieldsValue({
                attach: []
              })
            },
            beforeUpload: file => {
              form.setFieldsValue({
                attach: []
              })
              const isZip = file.type === 'application/x-zip-compressed';
              if (!isZip) {
                message.error('请上传zip压缩包');
                return Upload.LIST_IGNORE;
              }
              const isSizeOut = file.size / 1024 / 1024 < 10;
              if (!isSizeOut) {
                message.error('图片大小限制10M以内');
                return Upload.LIST_IGNORE;
              }
              return false;
            }
          }}>
            <Button icon={<UploadOutlined />}>上传项目压缩包（.zip格式）</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          style={{ textAlign: 'right' }}
          {...{
            wrapperCol: {
              span: 24,
            },
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            onClick={onSumit}
            className={style.submit}
            loading={loading}
          >
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ publishLog }) => ({
  projectOptions: publishLog.projectOptions,
}))(UpdateForm);