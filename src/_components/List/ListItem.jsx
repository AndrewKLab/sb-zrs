import React, { useState, useRef } from "react";
import { TweenMax } from "gsap";

export const ListItem = ({ className, children, button, onPress }) => {
    let styleClass = className == undefined ? '' : ' ' + className;

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const ref = useRef('ripple')


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


    switch (button) {
        case true:
            return (
                <button role="button" className={'list-item list-item-button list-item-ripple' + styleClass} onClick={onPress} onMouseDown={handleClick}>
                    {children}
                    <svg viewBox={`0 0 ${width} ${height}`} className="ripple-obj">
                        <circle ref={ref} cx="1" cy="1" r="1" />
                    </svg>
                </button>
            )

        case false:
            return <div className={'list-item' + styleClass}>{children}</div>
        default:
            return <div className={'list-item' + styleClass}>{children}</div>
    }
}





