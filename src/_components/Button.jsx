import React, { useState, useRef, useEffect } from "react";
import { ButtonLoading } from "./";

import { TweenMax } from "gsap";

export const Button = ({ id, type, children = null, className, variant, onPress, fullWidth, disabled, loading }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    let buttonId = id !== undefined ? id : null;
    let buttonType;
    let styleVariant;
    let styleDisabled;
    let fullWidthStyle = fullWidth === true ? ' w-100' : '';

    switch (disabled) {
        case true:
            styleDisabled = ' button-disabled'
            break;
        case false:
            styleDisabled = ''
            break;
        default:
            styleDisabled = ''
            break;
    }

    switch (variant) {
        case 'contained':
            styleVariant = ' button-contained '
            break;
        case 'outlined':
            styleVariant = ' button-outlined '
            break;
        default:
            styleVariant = ' button-contained '
            break;
    }

    switch (type) {
        case 'button':
            buttonType = 'button'
            break;
        case 'reset':
            buttonType = 'reset'
            break;
        case 'submit':
            buttonType = 'submit'
            break;
        default:
            buttonType = 'button'
            break;
    }

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const ref = useRef('ripple');


    const handleClick = (event) => {
        const elem = ref.current,
            x = event.nativeEvent.offsetX,
            y = event.nativeEvent.offsetY,
            w = event.target.offsetWidth,
            h = event.target.offsetHeight,
            offsetX = Math.abs((w / 2) - x),
            offsetY = Math.abs((h / 2) - y),
            deltaX = (w / 2) + offsetX,
            deltaY = (h / 2) + offsetY,
            scaleRatio = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))


        setWidth(...width, w)
        setHeight(...height, h)

        TweenMax.fromTo(elem, 0.5, {
            x: x,
            y: y,
            transformOrigin: '50% 50%',
            scale: 0,
            opacity: 1
        }, {
            scale: scaleRatio,
            opacity: 0
        })
    }

    return (
        <button id={buttonId} type={buttonType} className={'button ripple' + styleVariant + styleClass + fullWidthStyle + styleDisabled} disabled={disabled} onClick={onPress} onMouseDown={handleClick}>
            {loading && <ButtonLoading />}
            {children}
            <svg viewBox={`0 0 ${width} ${height}`} className="ripple-obj">
                <circle ref={ref} cx="1" cy="1" r="1" />
            </svg>
        </button>
    );
};
