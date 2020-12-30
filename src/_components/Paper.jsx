import React from 'react'

export const Paper = ({children, className, elevation, variant, square}) => {
    let styleClass = className == undefined ?  '' : ' '+className;
    let styleElevation = elevation == undefined ?  '' : ' paper-'+elevation;
    let styleVariant = variant == undefined ?  '' : ' paper-'+variant;
    let styleSquare = square == undefined ? ' paper-regular' : ' paper-square';

    return (
        <div className={'paper'+ styleClass + styleElevation + styleVariant + styleSquare}>
            {children}
        </div>
    )
}