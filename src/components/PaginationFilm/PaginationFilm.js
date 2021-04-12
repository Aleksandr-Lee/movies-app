import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import './PaginationFilm.css';

const PaginationFilm = (props) => {
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

PaginationFilm.defaultProps = {
  handlePageClick: () => {},
  totalCount: 0,
  pageSize: 20,
};

PaginationFilm.propTypes = {
  handlePageClick: PropTypes.func,
  totalCount: PropTypes.number,
  pageSize: PropTypes.number,
};

export default PaginationFilm;
