import React from 'react';
import Match from '../Match';

const Fixtures = ({ fixtures, results }) => (
  fixtures.map(
    (week, i) => (
      <div key={`week-${i}`}>
        <h5 className="is-size-5 has-text-white has-text-centered">Week {`${i+1}`}</h5>
        <div>
        {week.map(fixture => {
          const homeAway = fixture.join('');
          return (
            <Match
              key={homeAway}
              fixture={fixture}
              results={results[homeAway]}
            />
          );
        })}
        </div>
      </div>
    )
  )
)

export default Fixtures;
