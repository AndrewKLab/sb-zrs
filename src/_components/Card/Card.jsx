import React from 'react'

export const Card = ({children, className}) => {
    let styleClass = className == undefined ?  '' : ' '+className;

    return (
        <div className={'card'+styleClass}>
            {children}
        </div>
    )
}