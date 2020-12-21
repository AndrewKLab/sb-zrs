import React from 'react'

export const IconButton = (props) => {
    return (
        <button onClick={props.onClick} className={'icon-button'+" "+props.className} tabIndex="0" aria-haspopup="true" type="button">
            {props.children}
        </button>
    )
}


