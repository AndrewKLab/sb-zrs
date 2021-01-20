
import React, { useState, useRef, useEffect } from "react";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton } from '../'

export const Menu = ({ children, control, className }) => {
    let styleClass = className !== '' ? ' ' + className : '';
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

    const handleChange = (selectedValue) => {
        onChange(selectedValue);
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
            <IconButton onClick={(e) => setOpen(!open)} >
                <MoreHorizIcon />
            </IconButton>
            <div className={'menu-panel'} style={{ display: `${open === true ? 'block' : 'none'}` }}>
                {children}
            </div>
        </div>
    );
};
