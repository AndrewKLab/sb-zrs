import React, { useState, useRef, useEffect } from "react";

export const Button = ({ type, children = null, className, variant, onPress, fullWidth, disabled }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    let timeout;
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

    const [didMount, setDidMount] = useState(false);
    const [spanStyles, setSpanStyles] = useState({});
    const [rcount, setCount] = useState(0);
    const ButtonRef = useRef();

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
            <button type={buttonType} ref={ButtonRef} className={'button ripple' + styleVariant + styleClass + fullWidthStyle+styleDisabled} disabled={disabled} onClick={onPress}>
                {children}
                <div className="rippleContainer" onMouseDown={showRipplePlane} >
                    {renderRippleSpan()}
                </div>
            </button>
    );
};
