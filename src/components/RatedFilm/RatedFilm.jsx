import React from 'react';
import CardList from '../CardList';
import posterNull from './no-poster-available.jpg';

class RatedFilm extends React.Component {
  createPoster(poster) {
    return poster === null
      ? `${posterNull}`
      : `https://image.tmdb.org/t/p/w500/${poster}`;
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { ratedFilm } = this.props;
    return (
      <CardList
        films={ratedFilm}
        //  ratedFilm={ratedFilm}
        createPoster={this.createPoster}
      />
    );
  }
}

export default RatedFilm;
