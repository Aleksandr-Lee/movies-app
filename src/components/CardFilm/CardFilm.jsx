/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import format from 'date-fns/format';
import { Rate } from 'antd';
import posterNull from './no-poster-available.jpg';
import VoteAverage from '../VoteAverage';
import MovieService from '../../services/MovieService';
import Context from '../MovieServiceContext';
import 'antd/dist/antd.css';
import './CardFilm.css';

const CardFilm = (props) => {
  const setRatedFilm = new MovieService();

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
    setRatedFilm.setRatedFilm(id, sessionId, value);
  };

  const genresFilm = (genres, genresIds) => {
    if (genres === undefined) {
      return;
    }
    const genresFilm = [];
    genres.map((genres) => {
      genresIds.map((genresIds) => {
        if (genres.id === genresIds) {
          genresFilm.push(genres.name);
        }
      });
    });
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
            <div className="card-genres">{genresFilm(genres, genresIds)}</div>
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
export default CardFilm;
