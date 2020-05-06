import React from 'react';
import './TeamCard.scss';
import badges from '../badges';

const TeamCard = ({ team, activeSeasons, click, selected }) => {
  const { name, shortName, seasons } = team;
  const select = selected ? ' selected' : '';
  let disable = true;
  const colorizedSeasons = seasons
    .map((season, i) => {
      let active = activeSeasons.includes(season);
      disable = active ? false : disable;
      active = active
        ? 'has-text-danger'
        : 'has-text-grey';
      return (
        <span key={`${name}-${season}`}>
          {i > 0 ? ', ' : ''}
          <span className={active}>{season}</span>
        </span>
      );
    });
  disable = activeSeasons.length && disable ? ' disabled' : '';
  return (
    <div
     className={`Team-Card${select}${disable} box has-text-dark`}
     onClick={() => click(team.shortName)}
    >
      <div className="Team-Card__badge">
        <img src={badges[shortName]} alt={name} />
        <p className="is-size-4 is-hidden-desktop">{shortName}</p>
      </div>
      <div className="Team-Card__info">
        <h5 className="is-size-4">{name}</h5>
        <p className="is-size-7">
          {colorizedSeasons}
        </p>
      </div>
    </div>
  );
}

export default TeamCard;
