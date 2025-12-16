import React from 'react';
import './theme.css';

const Button = ({ onClick, children, type = 'button' }) => {
    return (
        <button className="primary-btn" onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;
