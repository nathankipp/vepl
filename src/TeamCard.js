import React from 'react';
import badges from './badges';

const TeamCard = ({ team, selected, disabled, click }) => {
  const { name, shortName, seasons } = team;
  const select = selected ? 'selected' : '';
  const disable = disabled ? 'disabled' : '';

  return (
    <div onClick={() => click(team.shortName)} className={`box team-card ${select} ${disable}`}>
      <img src={badges[shortName]} alt={name} />
      <div className="content">
        <h6>{name}</h6>
        <p className="is-size-7">{seasons.join(', ')}</p>
      </div>
    </div>
  );
}

export default TeamCard;
