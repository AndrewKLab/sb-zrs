import React, {useEffect, useRef} from 'react'

export const Dropdown = ({ children, className, id }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    const ref = useRef();

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          window.removeEventListener('mousedown', handleClickOutside);
        };
      }, [handleClickOutside]);

    const handleClickOutside = (event) => {
        if (ref && !ref.current.contains(event.target)) {
            document.getElementById(id).classList.remove("show");
            document.body.style.position="static"
            document.body.style.overflowY="auto"
        }
    }

    return (
        <div className={"dropdown"+styleClass} ref={ref}>
            <div id={id} className="dropdown-content">
                {children}
            </div>
        </div>

    )
}


