/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import './SearchPanel.css';

export default class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilm: '',
    };
  }

  onSearchFilm = (event) => {
    const { onSearchFilm } = this.props;
    const searchFilm = event.target.value;
    this.setState({ searchFilm });
    onSearchFilm(searchFilm);
  };

  render() {
    const { searchFilm } = this.state;
    return (
      <div className="search-panel">
        <Input
          type="text"
          className="search-input"
          placeholder="Type to search..."
          value={searchFilm}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={this.onSearchFilm}
        />
      </div>
    );
  }
}
