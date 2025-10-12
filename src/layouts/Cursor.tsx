import React, { Fragment } from 'react';

const Cursor: React.FC = () => {
  return (
    <Fragment>
      {/* Outer cursor ring element */}
      <div
        className='frenify-cursor cursor-outer'
        data-default='yes' /* Always visible by default */
        data-link='yes' /* Show when hovering links */
        data-slider='yes' /* Show when hovering sliders */
      >
        <span className='fn-cursor' />
      </div>

      {/* Inner cursor dot/circle element */}
      <div
        className='frenify-cursor cursor-inner'
        data-default='yes'
        data-link='yes'
        data-slider='yes'>
        <span className='fn-cursor'>
          {/* These spans create the left/right arrows that appear in slider mode */}
          <span className='fn-left' />
          <span className='fn-right' />
        </span>
      </div>
    </Fragment>
  );
};

export default Cursor;
