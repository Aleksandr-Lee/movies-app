import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import './PaginationFilm.css';

const PaginationFilm = (props) => {
  const { handlePageClick, totalCount } = props;
  return (
    <Pagination
      defaultCurrent={1}
      onChange={handlePageClick}
      size="small"
      total={totalCount}
      pageSize={20}
      showSizeChanger={false}
    />
  );
};

PaginationFilm.defaultProps = {
  handlePageClick: () => {},
  totalCount: 0,
};

PaginationFilm.propTypes = {
  handlePageClick: PropTypes.func,
  totalCount: PropTypes.number,
};

export default PaginationFilm;
