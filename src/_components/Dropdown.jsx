
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
        document.addEventListener("click", handleClick);
    
        return () => {
          document.removeEventListener("click", handleClick);
        };
      });

    if (open === true) {
        document.body.classList.add('stop-scrolling')
        return (
            <div className={"dropdown" + styleClass} ref={ref}>
                <div id={id} className="dropdown-content show">
                    {children}
                </div>
            </div>
        )
    } else {
        document.body.classList.remove('stop-scrolling')
        return null;
    }

}


