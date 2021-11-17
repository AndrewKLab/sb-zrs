import React, { useState, useRef, useEffect } from "react";
import { TweenMax } from "gsap";

export const Tab = ({ children, index, setWidthF, setLeftF, tab,  setTabActive, status, onClick }) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const ref = useRef('ripple');
    const buttonRef = useRef('button');

    useEffect(() => {
        if (index === 0) {
            const elem = buttonRef.current;
            setWidthF(elem.offsetWidth);
        }
    }, []);


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
        <button ref={buttonRef} id={index} className={`tab ripple${tab == index ? ' tab-active': ''}`} onClick={(event) => setTabActive(event)} onMouseDown={handleClick}>
            {children}
            <svg viewBox={`0 0 ${width} ${height}`} className="ripple-obj">
                <circle ref={ref} cx="1" cy="1" r="1" />
            </svg>
        </button>
    )
}


