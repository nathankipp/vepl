import React from 'react';
import badges from '../badges';

const TeamCard = ({ team, activeSeasons, click, selected }) => {
  const { name, shortName, seasons } = team;
  const select = selected ? ' selected' : '';
  let disable = true;
  const colorizedSeasons = seasons
    .map((season, i) => {
      let active = activeSeasons.includes(season);
      disable = active ? false : disable;
      active = !activeSeasons.length || active
        ? 'has-text-grey'
        : 'has-text-grey-lighter';
      return (
        <span key={`${name}-${season}`} className={active}>
          {season}
          {i < seasons.length - 1 ? ', ' : ''}
        </span>
      );
    });
  disable = activeSeasons.length && disable ? ' disabled' : '';
  return disable ? null : (
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
