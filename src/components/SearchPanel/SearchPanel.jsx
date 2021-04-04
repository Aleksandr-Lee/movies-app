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

  // eslint-disable-next-line consistent-return
  onSearchFilm = (event) => {
    // eslint-disable-next-line react/prop-types
    const { pageNumber } = this.props;
    // eslint-disable-next-line react/prop-types
    const { onSearchFilm } = this.props;
    const searchFilm = event.target.value;
    this.setState({ searchFilm });
    onSearchFilm(searchFilm, pageNumber);
  };

  render() {
    const { searchFilm } = this.state;
    // eslint-disable-next-line react/prop-types
    //  const { pageNumber } = this.props;
    //   console.log(pageNumber);
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
