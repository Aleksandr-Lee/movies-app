import React from 'react';
import { Alert } from 'antd';
import 'antd/dist/antd.css';
import './ErrorIndicator.css';

const ErrorIndicator = () => (
  <Alert message="Ошибка! Данные не получены." type="error" />
);

export default ErrorIndicator;
