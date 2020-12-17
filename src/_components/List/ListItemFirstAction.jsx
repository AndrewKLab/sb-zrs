import React from 'react'

export const ListItemFirstAction = (props) => {
    const {className, children} = props;
    let styleClass;
    if(className) {
        styleClass = ' '+className
    } else {
        styleClass = ''
    }
    return (
        <div className={'list-item-firt-action'+styleClass}>
            {children}
        </div>
    )
}


