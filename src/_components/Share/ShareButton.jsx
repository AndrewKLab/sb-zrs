import React from "react";
import ShareIcon from '@material-ui/icons/Share';
import { IconButton } from "..";

export const ShareButton = ({ children, className, control, toogleShare }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <div className={`share-button${styleClass}`}>
            {control ?
                control :
                <IconButton onClick={toogleShare}>
                    <ShareIcon />
                </IconButton>
            }
            {children}
        </div>
    );
};