import React from 'react'

export const ListItemFirstAction = (props) => {
    const {className, children} = props;
    let styleClass = className == undefined ?  '' : ' '+className;
    return (
        <div className={'list-item-firt-action'+styleClass}>
            {children}
        </div>
    )
}


