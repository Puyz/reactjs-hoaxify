import React from 'react';

const Spinner = () => {
    return (
        <div className="d-flex justify-content-center m-2">
            <div className="spinner-border text-primary">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;