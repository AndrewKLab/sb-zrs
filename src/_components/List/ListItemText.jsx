import React from 'react'
import { ListItemTitle, ListItemSubtitle } from '../'

export const ListItemText = (props) => {
    const { className, children, title, subtitle } = props;
    let styleClass;
    if (className) {
        styleClass = ' ' + className
    } else {
        styleClass = ''
    }
    return (
        <div className={'list-item-text' + styleClass}>  
            {title && <ListItemTitle title={title}/>}
            {subtitle && <ListItemSubtitle subtitle={subtitle}/>}
            {children}
        </div>
    )
}


