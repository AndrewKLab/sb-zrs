import React, { useEffect, useRef } from 'react'

export const Dialog = ({ open, children, className, onClose }) => {
    let styleClass = className == undefined ? '' : ' ' + className;
    var body = document.body;
    const ref = useRef(null);

    const handleClick = (e) => {
        if (ref && ref.current && ref.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        onClose();
    };


    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClick);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    if (open === true) {
        body.classList.add('stop-scrolling');
        return (
            <div ref={ref} className={'dialog-overlay'}>
                <div className={'dialog' + styleClass} onClick={(e) => { e.stopPropagation() }}>
                    {children}
                </div>
            </div>
        )
    } else {
        if (ref.current !== null) {
            body.classList.remove('stop-scrolling');
        }
        return null
    }
}