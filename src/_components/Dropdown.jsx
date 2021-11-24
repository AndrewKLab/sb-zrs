
import React, { useEffect, useRef, useState } from 'react'

export const Dropdown = ({ children, className, id, open, onClose, }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    const ref = useRef();


    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            document.body.classList.remove('stop-scrolling')
            onClose();
        }
    };

    useEffect(() => {
        if (open) {
            document.addEventListener("click", handleClick);
            document.body.classList.add('stop-scrolling')
        }


        return () => {
            document.removeEventListener("click", handleClick);
            document.body.classList.remove('stop-scrolling')
        };
    }, [open]);

    return (
        open &&
        <div className={"dropdown" + styleClass} ref={ref}>
            <div id={id} className="dropdown-content show">
                {children}
            </div>
        </div>
    )
}


