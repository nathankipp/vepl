import React from 'react';
import badges from '../badges';

const Result = ({ result, season }) => {
  return !result
    ? 'v'
    : (
      <div className="Result">
        <div className="is-size-5">{result.join(' - ')}</div>
        <div className="season">{season}</div>
      </div>
    );
};

const Match = ({
  fixture: [ home, away ],
  results: { result, season } = {}
}) => (
  <>
    <div className="Match box is-hidden-tablet">
      <div className="small">
        <img src={badges[home]} alt={home} />
        <span>v</span>
        <img src={badges[away]} alt={away} />
      </div>
      <Result result={result} season={season} />
    </div>
    <div className="Match box has-text-dark is-hidden-mobile">
      <span><img src={badges[home]} alt={home} /></span>
      <span>{home}</span>
      <span>
        <Result result={result} season={season} />
      </span>
      <span>{away}</span>
      <span><img src={badges[away]} alt={away} /></span>
    </div>
  </>
);

export default Match;
