import React, { useEffect, useRef } from 'react'

export const Dialog = ({ open, children, className, onClose }) => {
    let styleClass = className == undefined ? '' : ' ' + className;
    var body = document.body;
    const ref = useRef(null);
var cont = document.getElementsByClassName('container');
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
        
        // for (let i = 0; i < cont.length; i++) {
        //     let w = Number(getComputedStyle(cont[i]).maxWidth.replace(/\D/g,'')) + 17
        //     console.log(w)
        //     cont[i].style.maxWidth = w+"px"
        // }
        return (
            <div className={'dialog-overlay'}>
                <div ref={ref} className={'dialog' + styleClass} onClick={(e) => { e.stopPropagation() }}>
                    {children}
                </div>
            </div>
        )
    } else {
        if (ref.current !== null) {
            body.classList.remove('stop-scrolling');
            // for (let i = 0; i < cont.length; i++) {
            //     cont[i].style.maxWidth = null;
            // }
        }
        return null
    }
}