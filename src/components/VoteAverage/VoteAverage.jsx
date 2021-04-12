import React from 'react';
import PropTypes from 'prop-types';
import './VoteAverage.css';

const VoteAverage = (props) => {
  const { voteAverage } = props;
  let colorRating = '#E90000';

  if (voteAverage >= 3 && voteAverage < 5) {
    colorRating = '#E97E00';
  }
  if (voteAverage >= 5 && voteAverage < 7) {
    colorRating = '#E9D100';
  }
  if (voteAverage >= 7) {
    colorRating = '#66E900';
  }

  return (
    <div className="vote-wraooer" style={{ borderColor: colorRating }}>
      <span>{voteAverage}</span>
    </div>
  );
};

VoteAverage.defaultProps = {
  voteAverage: 0,
};
VoteAverage.propTypes = {
  voteAverage: PropTypes.number,
};

export default VoteAverage;
