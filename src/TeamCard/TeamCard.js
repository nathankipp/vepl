import React from 'react';
import './TeamCard.scss';
import badges from '../badges';

const TeamCard = ({ team, click, selected }) => {
  const { name, shortName, seasons } = team;
  const select = selected ? ' selected' : '';

  return (
    <div
     className={`Team-Card${select} box has-text-dark`}
     onClick={() => click(team.shortName)}
    >
      <div className="Team-Card__badge">
        <img src={badges[shortName]} alt={name} />
        <p className="is-size-4">{shortName}</p>
      </div>
      <div className="Team-Card__info">
        <h5 className="is-size-4">{name}</h5>
        <p className="is-size-7 has-text-grey-dark">
          {seasons.join(', ')}
        </p>
      </div>
    </div>
  );
}

export default TeamCard;
