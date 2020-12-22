import React from "react";

export const IconButton = ({ children, className, onClick }) => {
    let styleClass;

    if (className) {
        styleClass = " "+className
    } else {
        styleClass = ''
    }


    return (
        <button onClick={onClick} className={'icon-button'+styleClass} tabIndex="0" aria-haspopup="true" type="button">
            {children}
        </button>
    );
};



