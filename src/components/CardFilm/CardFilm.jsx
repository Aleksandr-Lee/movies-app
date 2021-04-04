import React from 'react';
import format from 'date-fns/format';
import { Rate } from 'antd';
import 'antd/dist/antd.css';
import './CardFilm.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class CardFilm extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-undef
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      stars: 0,
    };
  }

  ratefilm = (stars) => {
    console.log(stars);
    // eslint-disable-next-line react/no-unused-state
    this.setState({ stars });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { poster, title, date, description, stars } = this.props;
    //  const result = format(new Date(date), 'MMMM dd, yyyy');
    const dateResult =
      date === undefined || date === ''
        ? 'no date release'
        : format(new Date(date), 'MMMM dd, yyyy');
    return (
      <div className="card-wrapper">
        <img className="card-picture" src={poster} alt="#" />
        <div className="card-info">
          <h1 className="card-title">{title}</h1>
          <h2 className="card-date">{dateResult}</h2>
          <span className="card-category">Action</span>
          <span className="card-category">Drama</span>
          <p className="card-description">{description}</p>
          <Rate
            allowHalf
            defaultValue={stars}
            count={10}
            // eslint-disable-next-line no-shadow
            onChange={(stars) => {
              this.ratefilm(stars);
            }}
          />
        </div>
      </div>
    );
  }
}
