import React from 'react'

export const Dialog = ({ open, children, className, onClose }) => {
    let styleClass = className == undefined ? '' : ' ' + className;
    if (open === true) {
        document.body.classList.add('stop-scrolling')
        return (
            <div className={'dialog-overlay'} onClick={onClose}>
                <div className={'dialog' + styleClass} onClick={(e) => { e.stopPropagation() }}>
                    {children}
                </div>
            </div>
        )
    } else {
        document.body.classList.remove('stop-scrolling')
        return null
    }
}