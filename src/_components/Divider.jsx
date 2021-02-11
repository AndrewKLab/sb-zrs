import React from 'react'

export const Divider = ({className}) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    return (
        <hr className={`divider${styleClass}`}/>
    )
}


