import React from 'react'

export const ListItem = (props) => {
    const {className, children} = props;
    let styleClass;
    if(className) {
        styleClass = ' '+className
    } else {
        styleClass = ''
    }
    return (
        <div className={'list-item'+styleClass}>
            {children}
        </div>
    )
}


