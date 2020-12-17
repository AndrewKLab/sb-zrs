import React from 'react'

export const IconButton = (props) => {
    return (
        <button onClick={props.onClick} className={'icon-button'+" "+props.className} tabindex="0" aria-haspopup="true" type="button">
            {props.children}
        </button>
    )
}


