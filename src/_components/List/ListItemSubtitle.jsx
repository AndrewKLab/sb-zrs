import React from 'react'

export const ListItemSubtitle = (props) => {
    const { className, children, subtitle } = props;
    let styleClass = className == undefined ?  '' : ' '+className;
    return (
        <span className={'list-item-text-subtitle'  + styleClass}>
            {subtitle}
            {children}
        </span>
    )
}


