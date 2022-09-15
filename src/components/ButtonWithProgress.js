import React from 'react';

const ButtonWithProgress = (props) => {
    const {onClick, pending, disabled, text, className} = props; 

    return (
        <button 
            className={ className || "btn btn-primary mt-4"}
            onClick={onClick}
            disabled={disabled} >
                { pending && <span className="spinner-border spinner-border-sm" /> }
                {text}
        </button>
    );
};

export default ButtonWithProgress;