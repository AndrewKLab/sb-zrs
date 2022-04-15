import React, { useState, useRef } from "react";
import { TweenMax } from "gsap";

export const IconButton = ({ children, className, onClick, ariaLabel, color, disabled, style}) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    let styleDisabled = disabled && disabled === true ? ' icon-button-disabled' : '';
    let styleClass = className == undefined ? '' : ' ' + className;
    let styleColor;
    switch (color) {
        case 'primary':
            styleColor = ' color-primary'
            break;
        case 'secondary':
            styleColor = ' color-secondary'
            break;
        default:
            styleColor = ''
            break;
    }

    const handleClick = (event) => {
        const elem = ref.current,
            w = 40,
            h = 40,
            scaleRatio = Math.sqrt(Math.pow((w / 2), 2))

        setWidth(...width, w)
        setHeight(...height, h)

        TweenMax.fromTo(elem, 0.5, {
            x: 20,
            y: 20,
            transformOrigin: '50% 50%',
            scale: 0,
            opacity: 1
        }, {
            scale: scaleRatio,
            opacity: 0
        })
    }


    return (
        <button type="button" aria-label={ariaLabel} style={style} className={`icon-button${styleClass}${styleColor}${styleDisabled}`} disabled={disabled} onClick={onClick} onMouseDown={handleClick}>
            {children}
            <svg viewBox={`0 0 ${width} ${height}`} className="ripple-obj">
                <circle ref={ref} cx="1" cy="1" r="1" />
            </svg>
        </button>
    );
};



