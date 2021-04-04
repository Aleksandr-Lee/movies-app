import React from 'react';
import CardFilm from '../CardFilm';
import './CardList.css';

const CardList = (props) => {
  // eslint-disable-next-line react/prop-types
  const { films, createPoster } = props;
  if (films === undefined) {
    return [];
  }
  // eslint-disable-next-line react/prop-types
  const film = films.map((item) => (
    <CardFilm
      key={item.id}
      poster={createPoster(item.poster_path)}
      title={item.title}
      date={item.release_date}
      description={item.overview}
    />
  ));

  return (
    <div className="card-list">
      {!film.length ? (
        <h1 className="card-list--results">Поиск не дал результатов!</h1>
      ) : (
        film
      )}
      {/* {film} */}
    </div>
  );
};

export default CardList;
