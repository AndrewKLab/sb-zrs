import React from 'react'

export const CardActions = ({children, className}) => {
    let styleClass = className == undefined ?  '' : ' '+className;

    return (
        <div className={'сard-actions'+styleClass}>{children}</div>
    )
}


