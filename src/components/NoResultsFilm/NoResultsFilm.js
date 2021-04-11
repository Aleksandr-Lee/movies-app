import React from 'react';
import { Alert } from 'antd';
import 'antd/dist/antd.css';
import './NoResultsFilm.css';

const NoResultsFilm = () => (
  <Alert message="Фильм не найден, повторите поиск!" type="error" />
);

export default NoResultsFilm;
