import React, { useState } from 'react';
import './Bulma.scss';
import badges from '../badges';

export default function Bulma() {
  const [debug, setDebug] = useState(false);
  const dbug = () => (
    <div onClick={() => setDebug(!debug)} style={{ position: 'fixed', bottom: 0, right: 0, backgroundColor: 'black', color: 'white' }}>
    debug css
    </div>
  );
  return (
    <div className={debug ? 'debug' : ''}>{dbug()}
    <div style={{ border: '1px solid red', width: '100%' }}>x</div>

    <div className="Team-Cards">

    {['ARS', 'DER', 'CHE', 'BLB', 'ARS', 'DER', 'CHE', 'BLB'].map((a, i) => (
      <div className={`Team-Card box has-text-dark`}>
        <div className="Team-Card__badge">
          <img src={badges[a]} alt="BLB" />
          <p className="is-size-4">{a}</p>
        </div>
        <div className="Team-Card__info">
          <h5 className="is-size-4">Blackburn Rovers</h5>
          <p className="is-size-7 has-text-grey-light">
            {new Array(25).fill(1993).map((y,i) => `${y + i}`).join(', ')}
          </p>
        </div>
      </div>
    ))}

    </div>

    </div>
  );
}



// <section class="hero is-link is-fullheight">
// <div class="hero-head is-info">
// <nav class="level is-mobile">
// <div class="level-left">
// <div class="level-item">
// A Virtual EPL
// </div>
// </div>
// <div class="level-item">
// <p class="is-size-3">VEPL</p>
// </div>
// <div class="level-right">
// <div class="level-item">
// <button class="button is-primary">
// Play it out
// </button>
// </div>
// </div>
// </nav>
// </div>
// <div class="hero-body">
// <div className="tile is-ancestor" style={{ overflow: 'scroll' }}>
// {new Array(30).fill(0).map(() => (
//   <div class="tile is-parent">
//   <div class="tile is-child is-12 box">
//   <img src={badges['ARS']} style={{ height: '2rem' }} />
//   <p>ARS</p>
//   </div>
//   </div>
// ))}
// </div>
// </div>
// <div class="hero-food">
// hi
// </div>
// </section>
