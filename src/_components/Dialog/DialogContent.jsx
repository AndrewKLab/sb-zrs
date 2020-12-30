import React from 'react';


export const DialogContent = ({ children, className, dividers }) => {
    let styleClass = className == undefined ? '' : ' ' + className;
    let styleDividers = dividers == undefined ? '' : dividers == true ? ' dialog-content-dividers' : '';
    return (
        <div className={'dialog-content' + styleClass + styleDividers}>
            {children}
        </div>

    )
}