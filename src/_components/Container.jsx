import React from 'react'

export const Container = ({children, className}) => {
    let styleClass = className !== '' ? (' '+className) : ('');

    return (
        <div className={'container'+styleClass}>
            {children}
        </div>
    )
}


