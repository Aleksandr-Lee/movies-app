/* eslint-disable react/prop-types */
import React from 'react';
import format from 'date-fns/format';
import { Rate } from 'antd';
import VoteAverage from '../VoteAverage';
import MovieService from '../../services/MovieService';
import 'antd/dist/antd.css';
import './CardFilm.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class CardFilm extends React.Component {
  setRatedFilm = new MovieService();

  ratedFilms = (id, sessionId, value) => {
    // console.log(id);
    this.setRatedFilm.setRatedFilm(id, sessionId, value);
    //  .then((film) => {
    //    console.log(film);
    // this.setState({
    //   stars: value,
    // });
    // this.ratedFilm.ratedFilm(sessionId.guest_session_id).then((rated) => {
    // //   console.log(rated);
    //   this.setState({
    //     ratedFilm: rated.results,
    //   });
    // });
    //  });
  };

  // ratefilm = (stars) => {
  //   console.log(stars);
  //   // eslint-disable-next-line react/no-unused-state
  //   this.setState({ stars });
  // };

  render() {
    const {
      poster,
      title,
      date,
      description,
      sessionId,
      id,
      rated,
      voteAverage,
    } = this.props;

    const dateResult =
      date === undefined || date === ''
        ? 'no date release'
        : format(new Date(date), 'MMMM dd, yyyy');
    return (
      <div className="card-wrapper">
        <img className="card-picture" src={poster} alt="#" />
        <div className="card-info">
          <h1 className="card-title">{title}</h1>
          <VoteAverage voteAverage={voteAverage} />
          <h2 className="card-date">{dateResult}</h2>
          <span className="card-category">Action</span>
          <span className="card-category">Drama</span>
          <p className="card-description">{description}</p>
          <Rate
            allowHalf
            defaultValue={rated}
            count={10}
            onChange={(value) => {
              this.ratedFilms(id, sessionId, value);
            }}
          />
        </div>
      </div>
    );
  }
}
