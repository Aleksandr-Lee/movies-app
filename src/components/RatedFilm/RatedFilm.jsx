/* eslint-disable react/prop-types */
import React from 'react';
import CardList from '../CardList';
import ErrorIndicator from '../ErrorIndicator';

const RatedFilm = (props) => {
  const { ratedFilm } = props;

  if (ratedFilm === undefined) {
    return <ErrorIndicator />;
  }

  const retedContext = !ratedFilm.length ? null : (
    <CardList films={ratedFilm} ratedFilm={ratedFilm} />
  );

  return retedContext;
};

export default RatedFilm;
