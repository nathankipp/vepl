import React from 'react';
import vepl from '../badges/apple-touch-icon.png';

const NavBar = ({ canPlay, playClickHandler, isPlaying, reset }) => (
  <nav className="navbar is-link is-fixed-top" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="/">
        <img src={vepl} alt="vepl" width="28" height="28" />
      </a>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start">
        <p className="navbar-item is-size-5">
          Virtual EPL
        </p>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons has-addons">
            <button
              className={`button is-primary${isPlaying ? ' is-loading' : ''}`}
              disabled={!canPlay}
              onClick={() => playClickHandler()}
            >
              <strong>Play it!</strong>
            </button>
            <button
              className={`button is-danger${isPlaying ? ' is-loading' : ''}`}
              disabled={!canPlay}
              onClick={reset}
            >
              <strong>Reset</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
