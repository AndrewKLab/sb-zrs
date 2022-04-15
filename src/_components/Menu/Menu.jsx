
import React, { useState, useRef, useEffect } from "react";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton } from '../'

export const Menu = ({ children, control, className }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    const [open, setOpen] = useState(false);
    const node = useRef();

    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setOpen(false);
    };


    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClick);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    return (
        <div ref={node} className={'menu' + styleClass}>
            <div onClick={(e) => setOpen(!open)}>
            {control ? 
                control
                :
                <IconButton >
                    <MoreHorizIcon />
                </IconButton>
            }
            </div>
            {open === true ?
                <div className={'menu-panel'} onClick={(e) => setOpen(!open)}>
                    {children}
                </div>
                : null
            }
        </div>
    );
};
