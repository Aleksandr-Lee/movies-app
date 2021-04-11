/* eslint-disable react/prop-types */
import React from 'react';
import CardFilm from '../CardFilm';
import NoResultsFilm from '../NoResultsFilm';
import './CardList.css';

const CardList = (props) => {
  const { films, ratedFilm } = props;
  if (films === undefined || films === null) {
    return [];
  }

  const film = films.map((item) => {
    const ratedFilms = ratedFilm.filter((rated) => rated.id === item.id);
    if (ratedFilms.length) {
      item.rating = ratedFilms[0].rating;
    }

    return (
      <CardFilm
        key={item.id}
        id={item.id}
        poster={item.poster_path}
        title={item.title}
        date={item.release_date}
        genresIds={item.genre_ids}
        description={item.overview}
        rated={item.rating}
        voteAverage={item.vote_average}
      />
    );
  });

  return (
    <div className="card-list">
      {film.length === 0 ? <NoResultsFilm /> : film}
    </div>
  );
};

export default CardList;
