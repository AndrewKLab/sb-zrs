import React from 'react'

export const CardMedia = ({className, image,  height, width}) => {
    let styleClass = className == undefined ?  '' : ' '+className;

    return (
        <img className={'card-media'+styleClass} src={image} height={height} width={width}/>
    )
}


