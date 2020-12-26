import React from 'react'

export const Paper = ({children, className, elevation, variant, square}) => {
    let styleClass = className == undefined ?  '' : ' '+className;
    let styleElevation = elevation == undefined ?  '' : ' elevation-'+elevation;
    let styleVariant = variant == undefined ?  '' : ' variant-'+variant;
    let styleSquare = square == undefined ?  '' : ' paper-square';

    return (
        <div className={'paper'+ styleClass + styleElevation + styleVariant + styleSquare}>
            {children}
        </div>
    )
}