import React from 'react'

export const ListItemSecondAction = (props) => {
    const {className, children} = props;
    let styleClass = className == undefined ?  '' : ' '+className;
    return (
        <div className={'list-item-second-action'+styleClass}>
            {children}
        </div>
    )
}


