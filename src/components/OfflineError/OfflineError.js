import React from 'react';
import { Result } from 'antd';
import 'antd/dist/antd.css';
import './OfflineError.css';

const OfflineError = () => (
  <Result status="500" subTitle="Упс, нет соединения с интернетом" />
);

export default OfflineError;
