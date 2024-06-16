import React from 'react';
import './btn.css';

const Btn = ({children, ...props}) => {
  return (
    <button {...props} className={!props.className ? 'btn' : `btn ${props.className}`}>
      {children}
    </button>
  )
};

export default Btn;