import React from 'react'

export const List = ({children, className}) => {
    let styleClass = className == undefined ?  '' : ' '+className;

    return (
        <div className={'list'+styleClass}>
            {children}
        </div>
    )
}