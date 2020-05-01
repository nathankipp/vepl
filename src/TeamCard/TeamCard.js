import React from 'react';
import './TeamCard.scss';
import badges from '../badges';

const TeamCard = ({ team, click, selected }) => {
  const { name, shortName, seasons } = team;
  const select = selected ? ' selected' : '';

  return (
    <div
      className={`Team-Card${select}`}
      onClick={() => click(team.shortName)}
    >
      <img src={badges[shortName]} alt={name} />
      <div>
        <h4>{name}</h4>
        <p>{seasons.join(', ')}</p>
      </div>
    </div>
  );
}

export default TeamCard;
