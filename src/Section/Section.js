import React from 'react';

const Section = ({ title, content }) => (
  <div className="Section">
    <div className="Section__title">
      <h3 className="is-size-4 has-text-white">{title}</h3>
    </div>
    <div>{content()}</div>
  </div>
);

export default Section;
