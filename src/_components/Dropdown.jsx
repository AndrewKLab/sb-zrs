import React, {useEffect, useRef} from 'react'

export const Dropdown = ({ children, className, id, reff }) => {
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
            console.log(!event.target.matches('.dropbtn'))
            document.getElementById("search").classList.remove("show")
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


