import React from 'react';
import './App.scss';

import data from './seasons/data.json';
import badges from './badges';

const TeamCard = ({ team, selected, disabled }) => {
  const { name, shortName, seasons } = team;
  const sel = selected ? 'selected' : '';
  const dis = disabled ? 'disabled' : '';
  return (
    <div className={`box team-card ${sel} ${dis}`}>
      <img src={badges[shortName]} alt={name} />
      <div className="content">
        <h6>{name}</h6>
        <p className="is-size-7">{seasons.join(', ')}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="columns">
      <section className="section column is-7">
        <h3 className="is-size-3">Table</h3>
      </section>
      <section className="section column is-5 teams">
        <h3 className="is-size-3">Choose Teams</h3>
        {
          data.map((team) => (
            <TeamCard
              team={team}
              selected={team.shortName === 'BHA'}
              disabled={team.shortName.match(/AST|BAR/)}
            />
          ))
        }
      </section>
    </div>
  );
}

export default App;
