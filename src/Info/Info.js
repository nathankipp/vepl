import React from 'react';

const Info = () => (
  <div className="box">
    <h2 className="is-size-2">What <i>is</i> a virtual EPL?</h2>
    <hr />
    <p>
      The VEPL uses the results from every match in the English Premiere Leauge, going back to its innaugural year of 1993,
      to simulate an entire season.  The teams you select are pitted against each other in a round-robin of home and away matches,
      just like a real EPL season.  For each fixture a result is randomly chosen from the set of years in which <b>all</b> the selected
      teams participated in the leauge.
    </p>
    <p>&nbsp;</p>
    <p>
      Choose teams from the list on the right and your league table will start to fill up.  Selected teams have a yellow stripe
      on the left side; seasons under consideration are highlighted in <span className="is-warning">red</span>.  When you're ready
      for kick-off click the button at the top.
    </p>
    <p>&nbsp;</p>
    <p>
      Good luck to your favorite side!
    </p>
  </div>
);

export default Info;
