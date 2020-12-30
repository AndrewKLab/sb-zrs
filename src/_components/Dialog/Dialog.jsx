import React from 'react'

export const Dialog = ({ open, children, className, onClose }) => {
    let styleClass = className == undefined ? '' : ' ' + className;
    let isOpen = open == undefined ? false : open;
    return (
        isOpen === true ? (
            <div className={'dialog-overlay'} onClick={onClose}>
                <div className={'dialog' + styleClass} onClick={(e) => { e.stopPropagation() }}>
                    {children}
                </div>
            </div>
        ) : (null)
    )
}