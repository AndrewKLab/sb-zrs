import React from 'react'

export const DialogTitle = ({ children, className}) => {
    let styleClass = className == undefined ? '' : ' ' + className;
    return (
        <div className={'dialog-title' + styleClass} onClick={(e) => { e.stopPropagation() }}>
            {children}
        </div>
    )
}