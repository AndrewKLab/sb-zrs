
import React, { useState, useRef, useEffect } from "react";

export const MenuItem = ({ children, className, onPress }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    let timeout;
    const [didMount, setDidMount] = useState(false);
    const [spanStyles, setSpanStyles] = useState({});
    const [rcount, setCount] = useState(0);
    const menuItemRef = useRef();

    useEffect(() => {
        document.addEventListener("mouseup", callCleanUp);
        setDidMount(true);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mouseup", callCleanUp);
            setDidMount(false)
        };
    }, []);

    if (!didMount) {
        return null;
    }

    const callCleanUp = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cleanUp();
        }, 2000)
    }

    const showRipplePlane = (event) => {
        const rippleContainer = event.currentTarget;
        const size = rippleContainer.offsetWidth;
        const pos = rippleContainer.getBoundingClientRect();
        const x = event.pageX - pos.x - (size / 2);
        const y = event.pageY - pos.y - (size / 2);
        const sspanStyles = { top: y + 'px', left: x + 'px', height: size + 'px', width: size + 'px' };
        const count = rcount + 1;
        setSpanStyles({ ...spanStyles, [count]: sspanStyles })
        setCount(count)
    }

    const cleanUp = () => {
        setSpanStyles({})
        setCount(0)
    }


    const renderRippleSpan = () => {
        const spanArray = Object.keys(spanStyles);
        if (spanArray && spanArray.length > 0) {
            return (
                spanArray.map((key, index) => {
                    return <span key={'spanCount_' + index} className="" style={{ ...spanStyles[key] }}></span>
                })
            )
        } else {
            return null;
        }
    }


    return (
        <button role="button" ref={menuItemRef} className={'menu-item menu-item-button menu-item-ripple' + styleClass} onClick={onPress}>
            {children}
            <div className="rippleContainer" onMouseDown={showRipplePlane} >
                {renderRippleSpan()}
            </div>
        </button>
    );
};
