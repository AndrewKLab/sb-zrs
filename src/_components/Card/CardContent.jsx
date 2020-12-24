import React from 'react'

export const CardContent = ({children, className}) => {
    let styleClass = className == undefined ?  '' : ' '+className;

    return (
        <div className={'card-content'+styleClass}>{children}</div>
    )
}


