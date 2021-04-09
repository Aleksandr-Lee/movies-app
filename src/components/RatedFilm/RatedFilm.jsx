import React from 'react';
import CardList from '../CardList';

const RatedFilm = (props) => {
  // eslint-disable-next-line react/prop-types
  const { ratedFilm } = props;
  return <CardList films={ratedFilm} ratedFilm={ratedFilm} />;
};

export default RatedFilm;
