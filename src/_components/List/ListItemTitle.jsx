import React from 'react'

export const ListItemTitle = (props) => {
    const { className, children, title } = props;
    let styleClass;
    if (className) {
        styleClass = ' ' + className
    } else {
        styleClass = ''
    }
    return (
        <span className={'list-item-text-title'+ styleClass}>
            {title}
            {children}
        </span>
    )
}


