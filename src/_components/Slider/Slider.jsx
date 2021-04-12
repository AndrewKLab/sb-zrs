import React from 'react'

export const Slider = ({chidren, className}) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    return (
        <div className={`slider${styleClass}`}>123{chidren}</div>
    )
}


