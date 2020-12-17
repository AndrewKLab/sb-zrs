import React from 'react'

export const ListItemSubtitle = (props) => {
    const { className, children, subtitle } = props;
    let styleClass;
    if (className) {
        styleClass = ' ' + className
    } else {
        styleClass = ''
    }
    return (
        <span className={'list-item-text-subtitle'  + styleClass}>
            {subtitle}
            {children}
        </span>
    )
}


