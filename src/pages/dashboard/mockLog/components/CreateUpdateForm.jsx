import React, { useState, useRef } from 'react';
import { Form, Button, Input, Modal } from 'antd';
import MonacoEditor from '@/components/MonacoEditor'
import style from './form.less';

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
    address: values ? values.address : '',
    remark: values ? values.remark : '',
    content: values ? values.content : '',
  });
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm();

  const editorRef = useRef(null)

  const handleRef = (editor) => {
    editorRef.current = editor
  }

  const onReset = () => {
    form.resetFields();
  };

  const onSumit = async () => {
    try {
      setLoading(true)
      form.setFieldsValue({
        content: editorRef.current.getValue()
      })
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
      title={values ? '更新mock' : '新增mock'}
      visible={modalVisible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          ...formVals,
        }}
      >
        <Form.Item
          name="address"
          label="代理地址"
          rules={[
            {
              required: true,
              message: '请输入代理地址',
            },
          ]}
        >
          <Input placeholder="请输入代理地址" />
        </Form.Item>

        <Form.Item
          name="remark"
          label="代理备注"
          rules={[
            {
              required: true,
              message: '请输入代理备注',
            },
          ]}
        >
          <Input placeholder="请输入代理备注" />
        </Form.Item>

        <Form.Item
          name="content"
          label="代理内容"
          rules={[
            {
              required: true,
              message: '请输入代理内容',
            },
          ]}
        >
          <div className={style.monacoContainer}>
            <MonacoEditor onRef={handleRef} value={formVals.content} />
          </div>
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
