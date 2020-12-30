import React from 'react'

export const ListItemTitle = (props) => {
    const { className, children, title } = props;
    let styleClass = className == undefined ?  '' : ' '+className;
    return (
        <span className={'list-item-text-title'+ styleClass}>
            {title}
            {children}
        </span>
    )
}


