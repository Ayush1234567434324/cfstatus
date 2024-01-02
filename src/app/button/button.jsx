import React from 'react';

const Button6 = (props) => {
  const buttonStyle = {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '.25rem',
    boxShadow: 'rgb(0 0 0) 0px 1px 3px 0px',
    boxSizing: 'border-box',
    color: 'rgba(0, 0, 0, 0.85)',
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: 'system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: '12px',
    fontWeight: '600',
    justifyContent: 'center',
    lineHeight: '1.25',
    margin: '0',
    padding: '10px 10px',
    position: 'relative',
    textDecoration: 'none',
    transition: 'all 250ms',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'manipulation',
    verticalAlign: 'baseline',
    width: 'auto',
  };

  const handleButtonHover = () => {
    // Handle button hover if needed
  };

  const handleButtonClick = () => {
    // Handle button click if needed
  };

  return (
    <button
      className="button-6"
      role="button"
      style={buttonStyle}
      onMouseOver={handleButtonHover}
      onFocus={handleButtonHover}
      onClick={handleButtonClick}
    >
      {props.text}
    </button>
  );
};

export default Button6;
