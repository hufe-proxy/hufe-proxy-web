import React, { useState } from 'react';
import { Form, Button, Input, Modal, Select } from 'antd';
import style from './form.less';
import { ProjectSourceType } from '../../../../dataobject/enum/index'

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
    sourceType: values ? values.sourceType : null
  });
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onSumit = async () => {
    try {
      setLoading(true)
      const fieldsValue = await form.validateFields();
      const newVal = { ...formVals, ...fieldsValue };
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
      title={values ? '更新项目' : '新增项目'}
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
          label="名称"
          rules={[
            {
              required: true,
              message: '请输入项目名称',
            },
          ]}
        >
          <Input placeholder="请输入项目名称" />
        </Form.Item>

        <Form.Item
          name="sourceType"
          label="项目类别"
          rules={[
            {
              required: true,
              message: '请选择项目类别',
            },
          ]}
        >
          <Select
            options={
              [{
                label: '门诊', value: ProjectSourceType.Outpatient
              },
              {
                label: '住院', value: ProjectSourceType.Inpatient
              },
              {
                label: '其他', value: ProjectSourceType.Other
              }]
            }
            placeholder="请选择项目类别"
          />
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

export default UpdateForm;
