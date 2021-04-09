/* eslint-disable react/prop-types */
import React from 'react';
import CardFilm from '../CardFilm';
import './CardList.css';

const CardList = (props) => {
  const { films, ratedFilm } = props;
  if (films === undefined || films === null) {
    return [];
  }
  console.log(ratedFilm);

  const film = films.map((item) => (
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
  ));

  return (
    <div className="card-list">
      {film.length === 0 ? (
        <h1 className="card-list--results">Поиск не дал результатов!</h1>
      ) : (
        film
      )}
      {/* {film} */}
    </div>
  );
};

export default CardList;
