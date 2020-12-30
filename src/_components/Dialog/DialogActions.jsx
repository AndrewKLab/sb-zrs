import React from 'react'

export const DialogActions = ({ children, className}) => {
    let styleClass = className == undefined ? '' : ' ' + className;
    return (
        <div className={'dialog-actions' + styleClass}>
            {children}
        </div>
    )
}