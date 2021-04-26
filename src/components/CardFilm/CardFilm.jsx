/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { Rate } from 'antd';
import posterNull from '../../Assets/Images/no-poster-available.jpg';
import VoteAverage from '../VoteAverage';
import MovieService from '../../services/MovieService';
import Context from '../MovieServiceContext';
import 'antd/dist/antd.css';
import './CardFilm.css';

const CardFilm = (props) => {
  const moviesService = new MovieService();

  const {
    poster,
    title,
    date,
    genresIds,
    description,
    id,
    rated,
    voteAverage,
  } = props;

  const ratedFilms = (id, sessionId, value) => {
    moviesService.setRatedFilm(id, sessionId, value);
  };

  const genresFilms = (genres) => {
    const genresFilm = [];
    genres.map((genres) =>
      genresIds.map((genresIds) => {
        if (genres.id === genresIds) {
          genresFilm.push(genres.name);
        }
        return undefined;
      })
    );
    return genresFilm.map((genres) => (
      <span className="card-genres--item" key={genres}>
        {genres}
      </span>
    ));
  };

  const createPoster = (poster) =>
    poster === null
      ? `${posterNull}`
      : `https://image.tmdb.org/t/p/w500/${poster}`;

  const dateResult =
    date === undefined || date === ''
      ? 'no date release'
      : format(new Date(date), 'MMMM dd, yyyy');

  return (
    <Context.Consumer>
      {({ genres, sessionId }) => (
        <div className="card-wrapper">
          <img className="card-picture" src={createPoster(poster)} alt="#" />
          <div className="card-info">
            <h1 className="card-title">{title}</h1>
            <VoteAverage voteAverage={voteAverage} />
            <h2 className="card-date">{dateResult}</h2>
            <div className="card-genres">{genresFilms(genres)}</div>
            <p className="card-description">{description}</p>
            <div className="card-rate">
              <Rate
                allowHalf
                defaultValue={rated}
                count={10}
                onChange={(value) => {
                  ratedFilms(id, sessionId, value);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Context.Consumer>
  );
};

CardFilm.defaultProps = {
  poster: 'no poster',
  rated: 0,
  date: '',
};

CardFilm.propTypes = {
  poster: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  genresIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rated: PropTypes.number,
  voteAverage: PropTypes.number.isRequired,
};

export default CardFilm;
