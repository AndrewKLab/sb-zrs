import React from 'react'

export const ListItemIcon = (props) => {
    const {className, children} = props;
    let styleClass;
    if(className) {
        styleClass = ' '+className
    } else {
        styleClass = ''
    }
    return (
        <div className={'list-item-icon'+styleClass}>
            {children}
        </div>
    )
}


