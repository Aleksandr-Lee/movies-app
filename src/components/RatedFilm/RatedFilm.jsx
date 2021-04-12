import React from 'react';
import PropTypes from 'prop-types';
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

RatedFilm.defaultProps = {
  ratedFilm: [],
};

RatedFilm.propTypes = {
  ratedFilm: PropTypes.arrayOf(PropTypes.object),
};

export default RatedFilm;
