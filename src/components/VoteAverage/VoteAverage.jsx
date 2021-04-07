import React from 'react';

import './VoteAverage.css';

const VoteAverage = (props) => {
  // eslint-disable-next-line react/prop-types
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
    // eslint-disable-next-line react/style-prop-object
    <div className="vote-wraooer" style={{ borderColor: colorRating }}>
      <span>{voteAverage}</span>
    </div>
  );
};

export default VoteAverage;
