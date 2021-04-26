/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import './SearchPanel.css';

const SearchPanel = (props) => {
  const { onSearchFilm, search } = props;
  return (
    <div className="search-panel">
      <Input
        type="text"
        className="search-input"
        placeholder="Type to search..."
        value={search}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        onChange={onSearchFilm}
      />
    </div>
  );
};

SearchPanel.defaultProps = {
  onSearchFilm: () => {},
  search: '',
};

SearchPanel.propsTypes = {
  onSearchFilm: PropTypes.func,
  search: PropTypes.string,
};

export default SearchPanel;
