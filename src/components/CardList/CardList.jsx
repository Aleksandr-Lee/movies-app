/* eslint-disable react/prop-types */
import React from 'react';
import CardFilm from '../CardFilm';
import './CardList.css';

const CardList = (props) => {
  // eslint-disable-next-line react/prop-types
  const { films, createPoster, sessionId } = props;
  if (films === undefined) {
    return [];
  }
  // eslint-disable-next-line react/prop-types
  const film = films.map((item) => (
    <CardFilm
      key={item.id}
      id={item.id}
      poster={createPoster(item.poster_path)}
      title={item.title}
      date={item.release_date}
      description={item.overview}
      sessionId={sessionId}
      rated={item.rating}
      voteAverage={item.vote_average}
    />
  ));
  //  const ratedFilms = ratedFilm.map((item) => (
  //    <CardFilm
  //      key={item.id}
  //      id={item.id}
  //      poster={createPoster(item.poster_path)}
  //      title={item.title}
  //      date={item.release_date}
  //      description={item.overview}
  //      sessionId={sessionId}
  // 	  rated={item.rating}
  //    />
  //  ));

  // console.log(film);
  return (
    <div className="card-list">
      {/* {!film.length ? (
        <h1 className="card-list--results">Поиск не дал результатов!</h1>
      ) : (
        film
      )} */}
      {film}
    </div>
  );
};

export default CardList;

// function CardList (props) {
// 	// eslint-disable-next-line react/prop-types
// 	const { films, ratedFilm, createPoster, sessionId } = props;
// 	console.log(ratedFilm)
//   const createCardsArr = (itemArr) =>
//   // eslint-disable-next-line arrow-body-style
//   itemArr.map((item) => {
//       // let myRating = null;
//       // // eslint-disable-next-line react/prop-types
//       // const ratedFilms = ratedFilm.filter((rated) => rated.id === item.id);
//       // if (ratedFilms.length !== 0) {
//       //   // eslint-disable-next-line no-unused-vars
//       //   myRating = ratedFilm[0].rating;
// 		//   console.log(myRating)
//       // }

//       return (
//         <CardFilm
//           key={item.id}
//           id={item.id}
//           poster={createPoster(item.poster_path)}
//           title={item.title}
//           date={item.release_date}
//           description={item.overview}
// 			 rated={item.rating}
//           sessionId={sessionId}
//         />
//       );
//     });

//   return <>{createCardsArr(films)}</>;
// }
// export default CardList;
