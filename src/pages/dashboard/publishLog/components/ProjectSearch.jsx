import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Select } from 'antd';

const ProjectSearch = (props) => {
  const { projectOptions } = props;

  const [val, setVal] = useState([]);

  useEffect(() => {
    if (Array.isArray(projectOptions)) {
      const options = JSON.parse(JSON.stringify(projectOptions))
      options.unshift({
        value: null,
        label: "全部"
      })
      setVal(options);
    }
  }, [projectOptions]);

  return (
    <Select
      options={val}
      value={props.value}
      onChange={props.onChange}
      placeholder="请选择项目"
    />
  );
};

export default connect(({ publishLog }) => ({
  projectOptions: publishLog.projectOptions,
}))(ProjectSearch);
