import React from 'react';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import './PaginationFilm.css';

const PaginationFilm = (props) => {
  // eslint-disable-next-line react/prop-types
  const { handlePageClick, totalCount, pageSize } = props;
  return (
    <Pagination
      defaultCurrent={1}
      onChange={handlePageClick}
      size="small"
      total={totalCount}
      pageSize={pageSize}
      showSizeChanger={false}
    />
  );
};

export default PaginationFilm;
