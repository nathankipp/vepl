import React from 'react';
import badges from '../badges';

const Result = ({ result, season }) => {
  return !result
    ? 'v'
    : (
      <div className="Result">
        <div>{result.join(' - ')}</div>
        <div className="season">{season}</div>
      </div>
    );
};

const Match = ({
  fixture: [ home, away ],
  results: { result, season } = {}
}) => (
  <div className="Match box has-text-dark">
    <span><img src={badges[home]} alt={home} /></span>
    <span className="is-hidden-mobile">{home}</span>
    <span>
      <Result result={result} season={season} />
    </span>
    <span className="is-hidden-mobile">{away}</span>
    <span><img src={badges[away]} alt={away} /></span>
  </div>
);

export default Match;
