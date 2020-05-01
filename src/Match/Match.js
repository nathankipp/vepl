import React from 'react';
import './Match.scss';
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
  <div className="Match">
    <span><img src={badges[home]} alt={home} /></span>
    <span>{home}</span>
    <span>
      <Result result={result} season={season} />
    </span>
    <span>{away}</span>
    <span><img src={badges[away]} alt={away} /></span>
  </div>
);

export default Match;
