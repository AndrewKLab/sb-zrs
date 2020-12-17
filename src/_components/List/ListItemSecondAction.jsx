import React from 'react'

export const ListItemSecondAction = (props) => {
    const {className, children} = props;
    let styleClass;
    if(className) {
        styleClass = ' '+className
    } else {
        styleClass = ''
    }
    return (
        <div className={'list-item-second-action'+styleClass}>
            {children}
        </div>
    )
}


