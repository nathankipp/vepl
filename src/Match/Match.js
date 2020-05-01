import React from 'react';
import './Match.scss';
import badges from '../badges';

const Match = ({ home, away, result, year }) => (
  <div className="match">
    <span><img src={badges[home.shortName]} alt={home.name} /></span>
    <span>{home.shortName}</span>
    <span>v</span>
    <span>{away.shortName}</span>
    <span><img src={badges[away.shortName]} alt={away.name} /></span>
  </div>
);

export default Match;
