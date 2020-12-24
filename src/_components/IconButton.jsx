import React from "react";

export const IconButton = ({ children, className, onClick, ariaLabel, color }) => {
    let styleClass = className == undefined ? '' : ' ' + className;
    let styleColor;
    switch (color) {
        case 'primary':
            styleColor = ' color-primary'
            break;
        case 'secondary':
            styleColor = ' color-secondary'
            break;
        default:
            break;
    }
    return (
        <button onMouseDown={onClick} aria-label={ariaLabel} className={'icon-button' + styleClass + styleColor} tabIndex="0" aria-haspopup="true" type="button">
            {children}
        </button>
    );
};



