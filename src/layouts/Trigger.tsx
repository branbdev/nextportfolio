import React from 'react';

interface TriggerProps {
  open: () => void;
}

const Trigger: React.FC<TriggerProps> = ({ open }) => {
  return (
    <div className='menu_trigger'>
      <span className='text'>Menu</span>
      <button
        type='button'
        className='hamb'
        onClick={open}
        aria-label='Open Menu'>
        <span />
        <span />
        <span />
      </button>
    </div>
  );
};

export default Trigger;
